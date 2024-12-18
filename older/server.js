import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

const PORT = 5000;

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('order', (data) => {
    console.log('Received order data:', data);

    if (data.firstname && data.lastname && data.email && data.orderId) {
      socket.emit('orderResponse', {
        status: 'success',
        message: 'Order received successfully!',
        order: data,
      });
    } else {
      socket.emit('orderResponse', {
        status: 'error',
        message: 'Invalid input data. Please check all fields.',
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
