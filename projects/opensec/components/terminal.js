
// ============================================================
// 🖥️ TERMINAL — Advanced Terminal System
// ============================================================
const terminalState = {
    user: 'student',
    hostname: 'npx-lab',
    path: '/home/student',
    history: [],
    historyIndex: -1,
    isRoot: false,
    lastCommand: '',
};

// ── نظام الملفات المحاكى ──
const fileSystem = {
    '/': {
        type: 'dir',
        content: {
            'home': {
                type: 'dir',
                content: {
                    'student': {
                        type: 'dir',
                        content: {
                            'www': { type: 'dir', content: {} },
                            'evidence': { type: 'dir', content: {} },
                            'notes.txt': { type: 'file', content: '--- Lab Notes ---\n1. Discover open ports\n2. Enumerate web services\n3. Check for common vulnerabilities\n4. Find flag\n\nTip: Try "ls -la" to see all files' },
                            'config.ini': { type: 'file', content: '[database]\nhost = localhost\nuser = app_reader\npassword = training_only\n\n[app]\ndebug = true\nversion = 1.2.3' },
                            'flag.txt': { type: 'file', content: 'FLAG{red_team_operational_skill_2026}' },
                            '.bash_history': { type: 'file', content: 'ls\npwd\ncat notes.txt\nls -la\ncat config.ini' }
                        }
                    }
                }
            },
            'tmp': { type: 'dir', content: {} },
            'var': {
                type: 'dir',
                content: {
                    'log': {
                        type: 'dir',
                        content: {
                            'syslog': { type: 'file', content: 'Aug 18 10:30:45 npx-lab sshd[1234]: Accepted password for student from 10.10.20.1 port 54321 ssh2' },
                            'auth.log': { type: 'file', content: 'Aug 18 10:30:45 npx-lab sudo: student : TTY=pts/0 ; PWD=/home/student ; USER=root ; COMMAND=/bin/ls' }
                        }
                    }
                }
            }
        }
    }
};

// ── دوال نظام الملفات ──
function getNode(path) {
    if (!path) return null;
    let parts = path.split('/').filter(p => p !== '');
    if (parts.length === 0) return fileSystem['/'];
    
    let current = fileSystem['/'];
    for (let part of parts) {
        if (!current || !current.content || !current.content[part]) {
            return null;
        }
        current = current.content[part];
    }
    return current;
}

function getCurrentDir() {
    return getNode(terminalState.path) || getNode('/home/student');
}

function resolvePath(path) {
    if (!path) return terminalState.path;
    if (path === '/') return '/';
    if (path === '~') return '/home/student';
    if (path === '..') {
        let parts = terminalState.path.split('/').filter(p => p !== '');
        parts.pop();
        return '/' + parts.join('/') || '/';
    }
    if (path === '.') return terminalState.path;
    if (path.startsWith('/')) return path;
    if (path.startsWith('./')) {
        let base = terminalState.path;
        if (base === '/') return path.slice(1);
        return base + '/' + path.slice(2);
    }
    if (path.startsWith('../')) {
        let parts = terminalState.path.split('/').filter(p => p !== '');
        let up = path.split('../').filter(p => p !== '');
        for (let i = 0; i < path.split('../').length - 1; i++) {
            parts.pop();
        }
        let result = '/' + parts.join('/');
        if (up.length > 0 && up[0]) {
            result = result + '/' + up[0];
        }
        return result || '/';
    }
    return terminalState.path + '/' + path;
}

const commandHistory = [];

// ── دالة تنفيذ الأوامر المتقدمة ──
function executeAdvancedCommand(command) {
    if (!command || command.trim() === '') return '';
    
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);
    
    commandHistory.push(command.trim());
    if (commandHistory.length > 50) commandHistory.shift();
    terminalState.lastCommand = command.trim();
    
    switch(cmd) {
        // ── الأوامر الأساسية ──
        case 'whoami':
            return terminalState.user;
            
        case 'hostname':
            return terminalState.hostname;
            
        case 'pwd':
            return terminalState.path;
            
        case 'id':
            return `uid=1001(${terminalState.user}) gid=1001(${terminalState.user}) groups=1001(${terminalState.user}),1002(lab-users)`;
            
        case 'date':
            return new Date().toString();
            
        case 'uptime':
            return ` ${new Date().toLocaleTimeString()} up 2 days,  4:20,  1 user,  load average: 0.08, 0.03, 0.01`;
            
        case 'uname':
            if (args.includes('-a')) {
                return `Linux ${terminalState.hostname} 5.15.0-78-generic #85-Ubuntu SMP x86_64 GNU/Linux`;
            }
            return 'Linux';
            
        case 'echo':
            return args.join(' ');
            
        case 'env':
            return `HOME=/home/${terminalState.user}\nSHELL=/bin/bash\nUSER=${terminalState.user}\nPATH=/usr/local/bin:/usr/bin:/bin:/usr/games\nPWD=${terminalState.path}\nLANG=en_US.UTF-8\nTERM=xterm-256color`;
            
        // ── أوامر الملفات ──
        case 'ls': {
            let dir = getCurrentDir();
            if (!dir || !dir.content) return 'ls: cannot access: No such file or directory';
            
            if (args.includes('-la') || args.includes('-l')) {
                let result = [];
                let keys = Object.keys(dir.content);
                if (keys.length === 0) return 'total 0';
                for (let name of keys) {
                    let info = dir.content[name];
                    let type = info.type === 'dir' ? 'd' : '-';
                    let perms = info.type === 'dir' ? 'rwxr-xr-x' : 'rw-r--r--';
                    let size = info.type === 'dir' ? '4096' : String(info.content.length);
                    result.push(`${type}${perms} 1 ${terminalState.user} ${terminalState.user} ${size} ${new Date().toLocaleDateString()} ${name}`);
                }
                return result.join('\n');
            }
            
            if (args.includes('-a')) {
                return `.  ..  ${Object.keys(dir.content).join('  ')}`;
            }
            
            return Object.keys(dir.content).join('  ') || 'total 0';
        }
        
        case 'cd': {
            if (args.length === 0) {
                terminalState.path = '/home/student';
                return '';
            }
            let target = args[0];
            let fullPath = resolvePath(target);
            let dir = getNode(fullPath);
            if (!dir) return `cd: ${target}: No such file or directory`;
            if (dir.type !== 'dir') return `cd: ${target}: Not a directory`;
            terminalState.path = fullPath;
            return '';
        }
        
        case 'cat': {
            if (args.length === 0) return 'Usage: cat <file>';
            let filePath = args[0];
            let fullPath = resolvePath(filePath);
            let file = getNode(fullPath);
            if (!file) return `cat: ${filePath}: No such file or directory`;
            if (file.type === 'dir') return `cat: ${filePath}: Is a directory`;
            return file.content;
        }
        
        case 'mkdir': {
            if (args.length === 0) return 'Usage: mkdir <name>';
            let dir = getCurrentDir();
            if (!dir || !dir.content) return 'Directory not found';
            if (dir.content[args[0]]) return `mkdir: ${args[0]}: File exists`;
            dir.content[args[0]] = { type: 'dir', content: {} };
            return '';
        }
        
        case 'touch': {
            if (args.length === 0) return 'Usage: touch <file>';
            let dir = getCurrentDir();
            if (!dir || !dir.content) return 'Directory not found';
            if (!dir.content[args[0]]) {
                dir.content[args[0]] = { type: 'file', content: '' };
            }
            return '';
        }
        
        case 'rm': {
            if (args.length === 0) return 'Usage: rm <file>';
            let dir = getCurrentDir();
            if (!dir || !dir.content) return 'Directory not found';
            if (!dir.content[args[0]]) return `rm: ${args[0]}: No such file or directory`;
            if (dir.content[args[0]].type === 'dir') return `rm: ${args[0]}: Is a directory`;
            delete dir.content[args[0]];
            return '';
        }
        
        case 'rmdir': {
            if (args.length === 0) return 'Usage: rmdir <dir>';
            let dir = getCurrentDir();
            if (!dir || !dir.content) return 'Directory not found';
            if (!dir.content[args[0]]) return `rmdir: ${args[0]}: No such file or directory`;
            if (dir.content[args[0]].type !== 'dir') return `rmdir: ${args[0]}: Not a directory`;
            if (Object.keys(dir.content[args[0]].content).length > 0) return `rmdir: ${args[0]}: Directory not empty`;
            delete dir.content[args[0]];
            return '';
        }
        
        case 'find': {
            let name = args.length > 1 && args[0] === '-name' ? args[1] : '';
            let results = [];
            function search(node, path) {
                if (!node || !node.content) return;
                for (let [key, value] of Object.entries(node.content)) {
                    if (!name || key.includes(name.replace(/\*/g, ''))) {
                        results.push(path + '/' + key);
                    }
                    if (value.type === 'dir') {
                        search(value, path + '/' + key);
                    }
                }
            }
            let root = getCurrentDir();
            if (root) search(root, terminalState.path);
            return results.join('\n') || 'No files found';
        }
        
        case 'grep': {
            if (args.length < 2) return 'Usage: grep <pattern> <file>';
            let pattern = args[0];
            let filePath = args[1];
            let fullPath = resolvePath(filePath);
            let file = getNode(fullPath);
            if (!file) return `grep: ${filePath}: No such file or directory`;
            if (file.type === 'dir') return `grep: ${filePath}: Is a directory`;
            let lines = file.content.split('\n');
            let matches = lines.filter(line => line.includes(pattern));
            return matches.length > 0 ? matches.join('\n') : 'No matches found';
        }
        
        case 'head': {
            if (args.length === 0) return 'Usage: head <file>';
            let filePath = args[0];
            let fullPath = resolvePath(filePath);
            let file = getNode(fullPath);
            if (!file) return `head: ${filePath}: No such file or directory`;
            if (file.type === 'dir') return `head: ${filePath}: Is a directory`;
            let lines = file.content.split('\n');
            let n = 10;
            for (let i = 0; i < args.length; i++) {
                if (args[i] === '-n' && args[i+1]) {
                    n = parseInt(args[i+1]) || 10;
                    break;
                }
            }
            return lines.slice(0, n).join('\n');
        }
        
        case 'tail': {
            if (args.length === 0) return 'Usage: tail <file>';
            let filePath = args[0];
            let fullPath = resolvePath(filePath);
            let file = getNode(fullPath);
            if (!file) return `tail: ${filePath}: No such file or directory`;
            if (file.type === 'dir') return `tail: ${filePath}: Is a directory`;
            let lines = file.content.split('\n');
            let n = 10;
            for (let i = 0; i < args.length; i++) {
                if (args[i] === '-n' && args[i+1]) {
                    n = parseInt(args[i+1]) || 10;
                    break;
                }
            }
            return lines.slice(-n).join('\n');
        }
        
        case 'wc': {
            if (args.length === 0) return 'Usage: wc <file>';
            let filePath = args[0];
            let fullPath = resolvePath(filePath);
            let file = getNode(fullPath);
            if (!file) return `wc: ${filePath}: No such file or directory`;
            if (file.type === 'dir') return `wc: ${filePath}: Is a directory`;
            let lines = file.content.split('\n');
            let words = file.content.split(/\s+/).length;
            let chars = file.content.length;
            return `${lines.length} ${words} ${chars} ${filePath}`;
        }
        
        // ── أوامر الشبكة ──
        case 'ifconfig':
            return `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 10.10.20.15  netmask 255.255.255.0  broadcast 10.10.20.255\n        inet6 fe80::250:56ff:fe8c:3a2b  prefixlen 64  scopeid 0x20\n        ether 00:50:56:8c:3a:2b  txqueuelen 1000  (Ethernet)\n        RX packets 12345  bytes 12345678 (12.3 MB)\n        TX packets 6789  bytes 6789012 (6.7 MB)`;
        
        case 'ip':
            if (args[0] === 'addr') {
                return `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000\n    inet 10.10.20.15/24 brd 10.10.20.255 scope global eth0`;
            }
            return `ip: ${args[0]}: command not found`;
            
        case 'netstat':
            if (args.includes('-tuln')) {
                return `Active Internet connections (only servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN\ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN\ntcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN\ntcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN\ntcp6       0      0 :::22                   :::*                    LISTEN`;
            }
            return 'Usage: netstat -tuln';
            
        case 'ss':
            if (args.includes('-tuln')) {
                return `Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port\nudp    UNCONN  0       0       0.0.0.0:68            0.0.0.0:*\ntcp    LISTEN  0       0       0.0.0.0:22            0.0.0.0:*\ntcp    LISTEN  0       0       0.0.0.0:80            0.0.0.0:*\ntcp    LISTEN  0       0       127.0.0.1:3306        0.0.0.0:*`;
            }
            return 'Usage: ss -tuln';
            
        case 'ping':
            if (args.length === 0) return 'Usage: ping <host>';
            if (args[0] === 'google.com' || args[0] === 'localhost' || args[0] === '127.0.0.1') {
                return `PING ${args[0]} (127.0.0.1) 56(84) bytes of data.\n64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.123 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=2 ttl=64 time=0.098 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=3 ttl=64 time=0.112 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=4 ttl=64 time=0.105 ms\n\n--- ${args[0]} ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss, time 3003ms\nrtt min/avg/max/mdev = 0.098/0.109/0.123/0.010 ms`;
            }
            return `ping: ${args[0]}: Name or service not known`;
            
        case 'curl':
            if (args.length < 2) return 'Usage: curl <options> <url>';
            if (args[args.length - 1] === 'http://localhost') {
                return `HTTP/1.1 200 OK\nServer: nginx/1.18.0\nDate: ${new Date().toString()}\nContent-Type: text/html\nContent-Length: 256\nConnection: keep-alive\nX-Powered-By: Express`;
            }
            return `curl: (6) Could not resolve host: ${args[args.length - 1]}`;
            
        case 'wget':
            if (args.length === 0) return 'Usage: wget <url>';
            return `--${new Date().toISOString()}--  http://${args[0]}\nResolving ${args[0]}... failed: Name or service not known.\nwget: unable to resolve host address ‘${args[0]}’`;
            
        // ── أوامر النظام ──
        case 'ps':
            if (args.includes('aux')) {
                return `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1  16888 10240 ?        Ss   Aug16   0:02 /sbin/init\nroot       456  0.0  0.2  33580 20480 ?        Ss   Aug16   0:01 /lib/systemd/systemd-journald\n${terminalState.user}   1234  0.1  0.5  45678 51200 pts/0    Ss  10:00   0:03 /bin/bash\nroot      5678  0.0  0.3  23456 30720 ?        S   10:15   0:00 nginx: master process\nwww-data  5679  0.0  0.2  23456 20480 ?        S   10:15   0:00 nginx: worker process\nmysql     6789  0.2  1.2 123456 122880 ?       Ssl 09:00   0:15 /usr/sbin/mysqld\n${terminalState.user}   7890  0.0  0.4  34567 40960 pts/0    R+  ${new Date().toLocaleTimeString()}   0:00 ps aux`;
            }
            return `  PID TTY          TIME CMD\n 1234 pts/0    00:00:03 bash\n 7890 pts/0    00:00:00 ps`;
            
        case 'df':
            if (args.includes('-h')) {
                return `Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   12G   38G  24% /\n/dev/sdb1       100G   45G   55G  45% /home\n/dev/sdc1       200G   80G  120G  40% /var/www`;
            }
            return `Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1       52428800 12582912 39845888  24% /\n/dev/sdb1      104857600 47185920 57671680  45% /home`;
            
        case 'free':
            if (args.includes('-h')) {
                return `              total        used        free      shared  buff/cache   available\nMem:           7.8Gi       3.2Gi       2.1Gi       0.5Gi       2.5Gi       4.6Gi\nSwap:          2.0Gi       0.5Gi       1.5Gi`;
            }
            return `              total        used        free      shared  buff/cache   available\nMem:         8170000     3350000     2200000      512000     2620000     4820000\nSwap:        2097000      524000     1573000`;
            
        case 'top':
            return `top - ${new Date().toLocaleTimeString()} up 2 days,  4:20,  1 user,  load average: 0.08, 0.03, 0.01\nTasks:  98 total,   1 running,  97 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.1 id,  0.4 wa,  0.0 hi,  0.0 si,  0.0 st\nMiB Mem :   7982.1 total,   2150.3 free,   3276.8 used,   2555.0 buff/cache\nMiB Swap:   2048.0 total,   1536.0 free,    512.0 used.   4705.3 avail Mem\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n 1234 ${terminalState.user}   20   0   45678  51200  10240 S   0.7   0.6   0:03.45 bash\n 6789 mysql     20   0  123456 122880  20480 S   0.3   1.5   0:15.23 mysqld\n 5678 root      20   0   23456  30720   8192 S   0.0   0.4   0:00.12 nginx`;
            
        // ── أدوات ──
        case 'nmap': {
            if (args.length === 0) return 'Usage: nmap <target>';
            let target = args[args.length - 1];
            if (target === 'localhost' || target === '127.0.0.1' || target === '10.10.20.15') {
                return `Starting Nmap 7.80 ( https://nmap.org ) at ${new Date().toLocaleString()}\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.00010s latency).\nNot shown: 996 closed ports\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n3306/tcp open  mysql\n\nNmap done: 1 IP address (1 host up) scanned in 0.12 seconds`;
            }
            return `Starting Nmap 7.80 ( https://nmap.org ) at ${new Date().toLocaleString()}\nNmap scan report for ${target} (192.168.1.1)\nHost is up (0.0010s latency).\nNot shown: 998 filtered ports\nPORT     STATE SERVICE\n80/tcp   open  http\n443/tcp  open  https\n\nNmap done: 1 IP address (1 host up) scanned in 2.34 seconds`;
        }
        
        case 'nc':
            if (args.includes('-lvnp')) {
                return `listening on [any] ${args[args.length - 1]} ...\nconnect to [127.0.0.1] from (UNKNOWN) [127.0.0.1] 12345\nwhoami\n${terminalState.user}`;
            }
            return `nc: ${args.join(' ')}: command not found`;
            
        case 'ssh': {
            if (args.length === 0) return 'Usage: ssh <user>@<host>';
            let target = args[0];
            if (target === 'root@localhost' || target === 'student@localhost') {
                return `The authenticity of host 'localhost (127.0.0.1)' can't be established.\nECDSA key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes\nWarning: Permanently added 'localhost' (ECDSA) to the list of known hosts.\n${target.split('@')[0]}@localhost's password: \nLast login: ${new Date().toLocaleString()}\n${target.split('@')[0]}@npx-lab:~$`;
            }
            return `ssh: connect to host ${target} port 22: Connection refused`;
        }
        
        case 'sudo': {
            if (args.length === 0) return 'Usage: sudo <command>';
            let cmd = args.join(' ');
            if (cmd === 'whoami') {
                terminalState.isRoot = true;
                terminalState.user = 'root';
                return 'root';
            }
            if (cmd === 'ls') {
                return 'bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var';
            }
            if (cmd === 'cat /etc/shadow') {
                return `root:$6$xyz$abcdefghijklmnopqrstuvwxyz1234567890:19000:0:99999:7:::\ndaemon:*:19000:0:99999:7:::\nbin:*:19000:0:99999:7:::\nsys:*:19000:0:99999:7:::\nsync:*:19000:0:99999:7:::\n${terminalState.user}:$6$abc$defghijklmnopqrstuvwxyz1234567890:19000:0:99999:7:::`;
            }
            if (cmd === 'systemctl status nginx') {
                return `● nginx.service - A high performance web server\n   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)\n   Active: active (running) since ${new Date().toLocaleString()}\n     Docs: https://nginx.org/en/docs/\n  Process: 5678 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)\n Main PID: 5679 (nginx)\n    Tasks: 2 (limit: 4915)\n   Memory: 12.3M\n   CGroup: /system.slice/nginx.service\n           ├─5679 nginx: worker process\n           └─5680 nginx: worker process`;
            }
            if (cmd === 'systemctl restart nginx') {
                return 'Restarting nginx... [OK]';
            }
            if (cmd === 'apt update') {
                return `[sudo] password for ${terminalState.user}: \nReading package lists... Done\nAll packages are up to date.`;
            }
            return `sudo: ${cmd}: command not found`;
        }
        
        case 'apt': {
            if (args.length === 0) return 'Usage: apt <command>';
            let subCmd = args[0];
            if (subCmd === 'update') {
                return `Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease\nReading package lists... Done\nAll packages are up to date.`;
            }
            if (subCmd === 'install') {
                let pkg = args[1] || 'package';
                return `Reading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nThe following NEW packages will be installed:\n  ${pkg}\n0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.\nNeed to get 1,234 kB of archives.\nAfter this operation, 4,567 kB of additional disk space will be used.\nGet:1 http://archive.ubuntu.com/ubuntu jammy/main amd64 ${pkg} 1.2.3 [1,234 kB]\nFetched 1,234 kB in 2s (617 kB/s)\nSelecting previously unselected package ${pkg}.\n(Reading database ... 123456 files and directories currently installed.)\nPreparing to unpack ${pkg}_1.2.3_amd64.deb ...\nUnpacking ${pkg} (1.2.3) ...\nSetting up ${pkg} (1.2.3) ...\nProcessing triggers for man-db (2.10.2-1) ...`;
            }
            if (subCmd === 'search') {
                let pkg = args[1] || '';
                return `Sorting... Done\nFull Text Search... Done\n\n${pkg}/jammy 1.2.3 amd64 [installed]\n  Description of ${pkg} package\n\n${pkg}-dev/jammy 1.2.3 amd64\n  Development files for ${pkg}`;
            }
            return `apt: ${subCmd}: command not found`;
        }
        
        case 'systemctl': {
            if (args.length === 0) return 'Usage: systemctl <command> [service]';
            let subCmd = args[0];
            let service = args[1] || 'service';
            if (subCmd === 'status') {
                return `● ${service}.service - ${service} service\n   Loaded: loaded (/lib/systemd/system/${service}.service; enabled; vendor preset: enabled)\n   Active: active (running) since ${new Date().toLocaleString()}\n Main PID: 1234 (${service})\n    Tasks: 1 (limit: 4915)\n   Memory: 4.5M\n   CGroup: /system.slice/${service}.service\n           └─1234 /usr/sbin/${service}`;
            }
            if (subCmd === 'start') return `Starting ${service}.service... [OK]`;
            if (subCmd === 'stop') return `Stopping ${service}.service... [OK]`;
            if (subCmd === 'restart') return `Restarting ${service}.service... [OK]`;
            if (subCmd === 'enable') return `Synchronizing state of ${service}.service with SysV service script with /lib/systemd/systemd-sysv-install.\nExecuting: /lib/systemd/systemd-sysv-install enable ${service}\nCreated symlink /etc/systemd/system/multi-user.target.wants/${service}.service → /lib/systemd/system/${service}.service.`;
            if (subCmd === 'disable') return `Removed /etc/systemd/system/multi-user.target.wants/${service}.service.`;
            return `systemctl: ${subCmd}: command not found`;
        }
        
        // ── مساعدة ──
        case 'help':
            return `╔═══════════════════════════════════════════════════════════╗
║                    📚 AVAILABLE COMMANDS                      ║
╠═══════════════════════════════════════════════════════════╣
║ 📁 File System:                                             ║
║   ls, ls -la, cd, pwd, cat, mkdir, touch, rm, rmdir        ║
║   find, grep, head, tail, wc, sort, uniq                   ║
║                                                             ║
║ 👤 User Info:                                               ║
║   whoami, id, date, hostname, uptime, uname, env           ║
║                                                             ║
║ 🌐 Network:                                                 ║
║   ifconfig, ip addr, netstat -tuln, ss -tuln              ║
║   ping, curl, wget, nmap, nc, ssh                         ║
║                                                             ║
║ 📊 System:                                                  ║
║   ps aux, ps -ef, df -h, free -h, top                     ║
║                                                             ║
║ 🔧 Admin:                                                   ║
║   sudo, apt, systemctl                                    ║
║                                                             ║
║ 🧹 Other:                                                   ║
║   echo, clear, history, help                               ║
╚═══════════════════════════════════════════════════════════╝`;
            
        case 'history':
            if (commandHistory.length === 0) return 'No commands in history';
            return commandHistory.map((cmd, i) => `  ${i+1}  ${cmd}`).join('\n');
            
        case 'clear':
            return 'CLEAR_SCREEN';
            
        default:
            return `bash: ${cmd}: command not found. Type "help" for available commands.`;
    }
}

// ── تصدير الدوال ──
export {
    terminalState,
    executeAdvancedCommand,
    getCurrentDir,
    resolvePath,
    getNode,
    commandHistory,
    terminalState as terminal,
};

