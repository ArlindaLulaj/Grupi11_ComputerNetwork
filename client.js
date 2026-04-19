const net = require('net');
const readline = require('readline');

const HOST = process.argv[2] || '10.120.0.82';
const PORT = Number(process.argv[3]) || 5000;

// CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

console.log(Connecting to server ${HOST}:${PORT}...);

// Create TCP connection
const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log(Connected to server ${HOST}:${PORT});
  console.log('Commands: MESSAGE, READ, WRITE, EXECUTE, EXIT');
  rl.prompt();
});

// Receive data from server
client.on('data', (data) => {
  console.log(SERVER: ${data.toString().trim()});
  rl.prompt();
});

// Connection closed by server
client.on('end', () => {
  console.log('Disconnected from server.');
  rl.close();
});

// Connection closed
client.on('close', () => {
  console.log('Connection closed.');
});

// Error handling
client.on('error', (err) => {
  console.log(Connection error: ${err.message});
  rl.close();
});

// User input handling
rl.on('line', (line) => {
  const command = line.trim();

  if (!command) {
    rl.prompt();
    return;
  }

  // Send command to server
  client.write(command);

  // Exit command
  if (command.toUpperCase() === 'EXIT') {
    rl.close();
  }

  rl.prompt();
});

// Close CLI properly
rl.on('close', () => {
  client.end();
});
