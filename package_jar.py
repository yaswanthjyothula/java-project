"""
Packages target/classes into an executable cryptovista-x.jar archive.
"""
import os
import zipfile

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
CLASSES_DIR = os.path.join(WORKSPACE_DIR, 'target', 'classes')
OUTPUT_JAR = os.path.join(WORKSPACE_DIR, 'cryptovista-x.jar')

def build_jar():
    manifest_content = (
        "Manifest-Version: 1.0\r\n"
        "Created-By: 21 (CryptoVista Enterprise Packager)\r\n"
        "Main-Class: com.cryptovista.CryptoVistaApp\r\n"
        "\r\n"
    )

    with zipfile.ZipFile(OUTPUT_JAR, 'w', compression=zipfile.ZIP_DEFLATED) as jar:
        # Write MANIFEST.MF
        jar.writestr('META-INF/MANIFEST.MF', manifest_content)
        
        # Add all compiled .class files
        for root, dirs, files in os.walk(CLASSES_DIR):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, CLASSES_DIR).replace('\\', '/')
                jar.write(full_path, rel_path)
                print(f"  Added: {rel_path}")

    print(f"\n✓ Successfully packaged executable: {OUTPUT_JAR} ({os.path.getsize(OUTPUT_JAR):,} bytes)")

if __name__ == '__main__':
    build_jar()

