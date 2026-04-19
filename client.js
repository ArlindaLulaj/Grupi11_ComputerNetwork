const net = require('net');
const readline = require('readline');

const HOST = process.argv[2] || '10.120.0.82';
const PORT = Number(process.argv[3]) || 5000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

console.log(Connecting to server ${HOST}:${PORT}...);

const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log(Connected to server ${HOST}:${PORT});
  console.log('Write a command and press Enter.');
  console.log('Examples: MESSAGE hello, READ file.txt, WRITE file.txt text, EXECUTE LIST, EXIT');
  rl.prompt();
});

client.on('data', (data) => {
  console.log(data.toString().trim());
  rl.prompt();
});

client.on('end', () => {
  console.log('Disconnected from server.');
  rl.close();
});

client.on('close', () => {
  console.log('Connection closed.');
});

client.on('error', (err) => {
  console.log(Connection error: ${err.message});
  rl.close();
});

rl.on('line', (line) => {
  const command = line.trim();

  if (!command) {
    rl.prompt();
    return;
  }

  client.write(${command}\n);

  if (command === 'EXIT') {
    rl.close();
  }
});

rl.on('close', () => {
  client.end();
});
