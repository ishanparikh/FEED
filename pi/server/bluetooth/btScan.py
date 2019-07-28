import bluetooth
import subprocess

if bluetooth.lookup_name("40:4E:36:4A:04:C4") != None:
    subprocess.call(["/home/student/server/bluetooth/beep"])


