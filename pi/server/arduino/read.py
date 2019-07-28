import os, sys
import serial
import time

def read_weight():
    output = " "
    ser = serial.Serial('/dev/ttyACM0',9600,8,'N',1,timeout=1)
    while True:    
        while output != "":
            output = ser.readline()   
            output = output.strip('\r\n')
            if len(output.split()) > 2:
                output = output.split()
                print(int(output[0]))
def read_roomtemp():
    output = " "
    ser = serial.Serial('/dev/ttyACM0',9600,8,'N',1,timeout=1)
    while True:
        while output != "":
            output = ser.readline()
            output = output.strip('\r\n')
            if len(output.split()) > 2:
                output = output.split()
                print(int(float(output[1])))
