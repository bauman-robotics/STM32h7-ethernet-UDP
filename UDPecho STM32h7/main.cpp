#include "mbed.h"
#include "EthernetInterface.h"
#include "LWIPStack.h"

EthernetInterface net;

int main()
{
    printf("UDP Socket example\n");
    net.set_network(SocketAddress("192.168.0.10"), SocketAddress("255.255.255.0"), SocketAddress("192.168.0.1"));
    if (0 != net.connect()) {
        printf("Error connecting\n");
        return -1;
    }

    UDPSocket sock;
    sock.open(&net);
    sock.bind(55151);
    SocketAddress receive;

    for(;;) {
        char out_buffer[10] = "";
        sock.recvfrom(&receive, &out_buffer, sizeof(out_buffer));
//        printf(out_buffer);
        if (0 > sock.sendto(receive, out_buffer, sizeof(out_buffer))) {
            printf("Error sending data\n");
            return -1;
        }
    }
}