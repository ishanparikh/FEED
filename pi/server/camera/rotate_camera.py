#!/usr/bin/env python

"""Copyright 2010 Phidgets Inc.
This work is licensed under the Creative Commons Attribution 2.5 Canada License. 
To view a copy of this license, visit http://creativecommons.org/licenses/by/2.5/ca/
"""

__author__ = 'Adam Stelmack'
__version__ = '2.1.9'
__date__ = 'May 17 2010'

"""
This is a very simple example of the AdvancedServo's capabilities.  Please study the Python API manual as well as the AdvancedServo product
manual to get a better idea as to the full capabilities of this device.
"""

#Basic imports
from ctypes import *
import sys
from time import sleep
#Phidget specific imports
from Phidgets.PhidgetException import PhidgetErrorCodes, PhidgetException
from Phidgets.Events.Events import AttachEventArgs, DetachEventArgs, ErrorEventArgs, CurrentChangeEventArgs, PositionChangeEventArgs, VelocityChangeEventArgs
from Phidgets.Devices.AdvancedServo import AdvancedServo
from Phidgets.Devices.Servo import ServoTypes
from Phidgets.Phidget import PhidgetLogLevel

#Create an advancedServo object
try:
    advancedServo = AdvancedServo()
except RuntimeError as e:
    print("Runtime Exception: %s" % e.details)
    print("Exiting....")
    exit(1)

#stack to keep current values in
currentList = [0,0,0,0,0,0,0,0]
velocityList = [0,0,0,0,0,0,0,0]

#Information Display Function
def DisplayDeviceInfo():
    print("|------------|----------------------------------|--------------|------------|")
    print("|- Attached -|-              Type              -|- Serial No. -|-  Version -|")
    print("|------------|----------------------------------|--------------|------------|")
    print("|- %8s -|- %30s -|- %10d -|- %8d -|" % (advancedServo.isAttached(), advancedServo.getDeviceName(), advancedServo.getSerialNum(), advancedServo.getDeviceVersion()))
    print("|------------|----------------------------------|--------------|------------|")
    print("Number of motors: %i" % (advancedServo.getMotorCount()))

#Event Handler Callback Functions
def Attached(e):
    attached = e.device
    print("Servo %i Attached!" % (attached.getSerialNum()))

def Detached(e):
    detached = e.device
    print("Servo %i Detached!" % (detached.getSerialNum()))

def Error(e):
    try:
        source = e.device
        print("Phidget Error %i: %s" % (source.getSerialNum(), e.eCode, e.description))
    except PhidgetException as e:
        print("Phidget Exception %i: %s" % (e.code, e.details))

def CurrentChanged(e):
    global currentList
    currentList[e.index] = e.current

def PositionChanged(e):
    source = e.device
    print("AdvancedServo %i: Motor %i Position: %f - Velocity: %f - Current: %f" % (source.getSerialNum(), e.index, e.position, velocityList[e.index], currentList[e.index]))
    if advancedServo.getStopped(e.index) == True:
        print("Motor %i Stopped" % (e.index))

def VelocityChanged(e):
    global velocityList
    velocityList[e.index] = e.velocity

def move_left():
    print("Engage the motor...")
    advancedServo.setEngaged(0, True)
    sleep(2)
    
    print("Engaged state: %s" % advancedServo.getEngaged(0))
    
    print("Move to position positionMin...")
    advancedServo.setPosition(0, advancedServo.getPositionMin(0))
    sleep(5)
    
    print("Disengage the motor...")
    advancedServo.setEngaged(0, False)
    sleep(2)
    
    print("Engaged state: %s" % advancedServo.getEngaged(0))

def move_right():
    print("Engage the motor...")
    advancedServo.setEngaged(0, True)
    sleep(2)
    
    print("Engaged state: %s" % advancedServo.getEngaged(0))
    
    print("Move to position positionMin...")
    advancedServo.setPosition(0, advancedServo.getPositionMax(0))
    sleep(5)
    
    print("Disengage the motor...")
    advancedServo.setEngaged(0, False)
    sleep(2)
    
    print("Engaged state: %s" % advancedServo.getEngaged(0))


def set_up_event_handlers():
    #set up our event handlers
    try:
        #logging example, uncomment to generate a log file
        #advancedServo.enableLogging(PhidgetLogLevel.PHIDGET_LOG_VERBOSE, "phidgetlog.log")
        advancedServo.setOnAttachHandler(Attached)
        advancedServo.setOnDetachHandler(Detached)
        advancedServo.setOnErrorhandler(Error)
        advancedServo.setOnCurrentChangeHandler(CurrentChanged)
        advancedServo.setOnPositionChangeHandler(PositionChanged)
        advancedServo.setOnVelocityChangeHandler(VelocityChanged)
    except PhidgetException as e:
        print("Phidget Exception %i: %s" % (e.code, e.details))
        print("Exiting....")
        exit(1)


def open_phidget():
    print("Opening phidget object....")
    try:
        advancedServo.openPhidget()
    except PhidgetException as e:
        print("Phidget Exception %i: %s" % (e.code, e.details))
        print("Exiting....")
        exit(1)

def attach_phidget():
    print("Waiting for attach....")
    try:
        advancedServo.waitForAttach(10000)
    except PhidgetException as e:
        print("Phidget Exception %i: %s" % (e.code, e.details))
        try:
            advancedServo.closePhidget()
        except PhidgetException as e:
            print("Phidget Exception %i: %s" % (e.code, e.details))
            print("Exiting....")
            exit(1)
        print("Exiting....")
        exit(1)
    else:
        DisplayDeviceInfo()

def set_movement_settings():
    try:
        print("Setting the servo type for motor 0 to HITEC_HS322HD")
        advancedServo.setServoType(0, ServoTypes.PHIDGET_SERVO_HITEC_HS322HD)
        #Setting custom servo parameters example - 600us-2000us == 120 degrees, velocity max 1500
        #advancedServo.setServoParameters(0, 600, 2000, 120, 1500)
        print("Speed Ramping state: %s" % advancedServo.getSpeedRampingOn(0))
        print("Stopped state: %s" % advancedServo.getStopped(0))
        print("Engaged state: %s" % advancedServo.getEngaged(0))
        
        print("Working with motor 0 only...")
        
        print("Adjust Acceleration to maximum: %f" % advancedServo.getAccelerationMax(0))
        advancedServo.setAcceleration(0, advancedServo.getAccelerationMax(0))
        sleep(2)
        
        print("Adjust Velocity Limit to maximum: %f" % advancedServo.getVelocityMax(0))
        advancedServo.setVelocityLimit(0, advancedServo.getVelocityMax(0))
        sleep(2)
    except PhidgetException as e:
        print("Phidget Exception %i: %s" % (e.code, e.details))
        try:
            advancedServo.closePhidget()
        except PhidgetException as e:
            print("Phidget Exception %i: %s" % (e.code, e.details))
            print("Exiting....")
            exit(1)
        print("Exiting....")
        exit(1)

if __name__=="__main__":
    direction = sys.argv[1]
    set_up_event_handlers()
    open_phidget()
    attach_phidget()
    set_movement_settings()
    if direction == "LEFT":
        move_left()
    elif direction == "RIGHT":
        move_right()
    try:
        advancedServo.closePhidget()
    except PhidgetException as e:
        print("Phidget Exception %i: %s" % (e.code, e.details))
        print("Exiting....")
        exit(1)
    print("Done.") 
    exit(0)
