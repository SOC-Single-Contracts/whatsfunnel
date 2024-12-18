import { io } from 'socket.io-client';

const SERVER_URL = 'http://3.76.225.188:5000';

// Establish connection to the server
const socket = io(SERVER_URL);

// Log when connected
socket.on('connect', () => {
  console.log('Connected to server:', socket.id);

  // Send a valid order to the server
  console.log('Sending valid order data...');
  socket.emit('order', {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    orderId: '12345',
  });

  // Send an invalid order to the server
  console.log('Sending invalid order data...');
  socket.emit('order', {
    firstname: 'John',
    email: 'john.doe@example.com',
  });
});

// Listen for order response from the server
socket.on('orderResponse', (response) => {
  console.log('Response from server:', response);
});

// Handle server disconnect
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Handle connection errors
socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});
