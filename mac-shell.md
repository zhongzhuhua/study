zhong:h5standard $  sudo lsof -i:4000
Password:
COMMAND   PID        USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    33303 zhongzhuhua   14u  IPv4 0x52e955e7c99a7155      0t0  TCP *:terabase (LISTEN)

zhong:h5standard $  sudo kill -9 33303