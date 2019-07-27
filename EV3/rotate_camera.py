#! /usr/bin/env python3
# Core imports
import time
import sys
import ev3dev.ev3 as ev3
import ev3dev.core as ev3core

 

def rotate_camera(direction):
	time.sleep(0.5)
	if direction == 1:
		camera_motor.run_timed(speed_sp=100,time_sp=250)
	if direction == 0:
		camera_motor.run_timed(speed_sp=-100,time_sp=250)

if __name__ == '__main__':

	direction = int(sys.argv[1])	
	camera_motor = ev3.MediumMotor('outC')
	

	rotate_camera(direction)

