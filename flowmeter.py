import serial

print('welcome')
ser = serial.Serial('/dev/tty.usbserial', 9600, bytesize=8, rtscts=0, xonxoff=0, stopbits=1, timeout=None)
#ser.open()
f = open('/Users/Simon/projects/controldata/testfile.txt', 'w')
if ser.is_open:
	print('opened')
	while(True):
		line = ser.readline().decode('ascii')
		f.write(line)
		#line = ser.read(1)
		print(line)
	
else:
	print('closed')


ser.close()
f.close()
"""
if is_open: 
	print('Port is open')
	while(True):
		line = ser.readline()
		print(line)
"""


