import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(AppGateway.name);

  @WebSocketServer()
  server: Server;

  constructor() {}

  async handleConnection(client: Socket) {
    try {
      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      this.logger.warn(`WS auth failed: ${error.message}`);
      client.disconnect(true);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      this.logger.log(`Received: ${data.message}`);
      client.emit('response', data.message);
      // client.emit('done');
      client.broadcast.emit('message', '1 ' + data.message)
    } catch (error) {
      this.logger.warn(`WS auth failed: ${error.message}`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: any, ...args): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
