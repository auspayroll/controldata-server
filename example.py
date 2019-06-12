import threading
import time
import serial 
import sys

data = """
18-04-22 12:24:20
Flow  0  l/h
Vel:  0 m/s
NET: +6x m
POS: +6x m
NEG:  0x m
UP:000 DN:000 Q=00
TIM= 36:31:53
TODAY  2.99504 m3
"""

ser = serial.serial_for_url("loop://") 

class MyThread(threading.Thread):
    def run(self):
        while(True):
            ser.write(data)      
            time.sleep(2)                                            
def main():
    mythread = MyThread()
    mythread.start()  
    i = 0
    while i < 15:       
        l = ser.readline().decode('ascii')
        print(l)
        i += 1
    mythread._Thread__stop()


if __name__ == '__main__':main()
