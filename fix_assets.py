import os
import shutil

# المسارات
PUBLIC_DIR = "public"
ASSETS_DIR = "src/assets"
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")

def move_images():
    if not os.path.exists(PUBLIC_DIR):
        os.makedirs(PUBLIC_DIR)
    if not os.path.exists(IMAGES_DIR):
        os.makedirs(IMAGES_DIR)
    
    # نقل ملفات الصور من src/assets إلى public/images
    if os.path.exists(ASSETS_DIR):
        for file in os.listdir(ASSETS_DIR):
            if file.endswith(('.png', '.svg', '.ico', '.jpg', '.jpeg')):
                src_path = os.path.join(ASSETS_DIR, file)
                dst_path = os.path.join(IMAGES_DIR, file)
                shutil.copy(src_path, dst_path)
                print(f"✅ تم نقل: {file}")
    else:
        print("❌ مجلد src/assets غير موجود!")

def update_index_html():
    # تحديث مسار الصور في ملف index.html (إذا كان موجوداً)
    index_path = "index.html"
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # استبدال المسارات القديمة بالجديدة
        content = content.replace('src="/assets/', 'src="/images/')
        content = content.replace('src="assets/', 'src="/images/')
        content = content.replace('href="/assets/', 'href="/images/')
        
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("✅ تم تحديث مسارات الصور في index.html")
    else:
        print("⚠️ ملف index.html غير موجود، تخطي التحديث.")

if __name__ == "__main__":
    move_images()
    update_index_html()
