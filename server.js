const net = require('net');
const fs = require('fs');
const path = require('path');

const HOST = '0.0.0.0';
const PORT = 5000;

const FILES_DIR = path.join(__dirname, 'server_files');

if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR);
}

const sampleFile = path.join(FILES_DIR, 'sample.txt');

if (!fs.existsSync(sampleFile)) {
  fs.writeFileSync(sampleFile, 'Ky eshte file testues per komanden READ.\n', 'utf8');
}

function getSafeFilePath(fileName) {
  if (!fileName || fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
    return null;
  }

  return path.join(FILES_DIR, fileName);
}

function handleReadCommand(socket, fileName) {
  const filePath = getSafeFilePath(fileName);

  if (!filePath) {
    socket.write('Invalid file name.\n');
    return;
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      socket.write('File not found.\n');
      return;
    }

    socket.write(`File content:\n${data}\n`);
  });
}

function handleWriteCommand(socket, commandText) {
  if (socket.role !== 'admin') {
    socket.write('Permission denied. Only admin can write.\n');
    return;
  }

  const parts = commandText.trim().split(' ');
  const fileName = parts.shift();
  const content = parts.join(' ');

  const filePath = getSafeFilePath(fileName);

  if (!filePath) {
    socket.write('Invalid file name.\n');
    return;
  }

  if (!content) {
    socket.write('Write content is missing.\n');
    return;
  }

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      socket.write('Could not write file.\n');
      return;
    }

    socket.write('File written successfully.\n');
  });
}

function handleExecuteCommand(socket, commandName) {
  if (socket.role !== 'admin') {
    socket.write('Permission denied. Only admin can execute.\n');
    return;
  }

  if (commandName !== 'LIST') {
    socket.write('Only EXECUTE LIST is allowed.\n');
    return;
  }

  fs.readdir(FILES_DIR, (err, files) => {
    if (err) {
      socket.write('Could not list files.\n');
      return;
    }

    socket.write(`Files in server_files:\n${files.join('\n')}\n`);
  });
}

function handleClientMessage(socket, rawMessage) {
  const message = rawMessage.trim();

  if (!message) {
    return;
  }

  console.log(`Client ${socket.id}: ${message}`);

  if (message.startsWith('MESSAGE ')) {
    const text = message.slice(8).trim();
    socket.write(`Message received: ${text}\n`);
    return;
  }

  if (message.startsWith('READ ')) {
    const fileName = message.slice(5).trim();
    handleReadCommand(socket, fileName);
    return;
  }

  if (message.startsWith('WRITE ')) {
    const commandText = message.slice(6);
    handleWriteCommand(socket, commandText);
    return;
  }

  if (message.startsWith('EXECUTE ')) {
    const commandName = message.slice(8).trim().toUpperCase();
    handleExecuteCommand(socket, commandName);
    return;
  }

  if (message === 'EXIT') {
    socket.write('Connection closed.\n');
    socket.end();
    return;
  }

  socket.write('Unknown command.\n');
}

let clientCounter = 0;
const clients = [];
let adminAssigned=false;

const server = net.createServer((socket) => {
  clientCounter += 1;

  socket.id = clientCounter;
  if (!adminAssigned) {
  socket.role = 'admin';
  adminAssigned = true;
} else {
  socket.role = 'read-only';
}

  clients.push(socket);

 const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;

console.log(`Client ${socket.id} connected from ${clientAddress}.`);
console.log(`Active clients: ${clients.length}`);

socket.write('Connected to TCP server.\n');
socket.write(`Your client ID is ${socket.id}.\n`);
socket.write(`Your role is: ${socket.role}\n`);


  socket.on('data', (data) => {
    const messages = data.toString().split('\n');

    messages.forEach((message) => {
      handleClientMessage(socket, message);
    });
  });

  socket.on('end', () => {
    console.log(`Client ${socket.id} disconnected.`);
  });

  socket.on('close', () => {
    const index = clients.indexOf(socket);

    if (index !== -1) {
      clients.splice(index, 1);
    }
    if (socket.role === 'admin') {
     adminAssigned = false;
    }
    console.log(`Client ${socket.id} connection closed.`);
     console.log(`Active clients:${clients.length}`);
  });

  socket.on('error', (err) => {
    console.log(`Client ${socket.id} error: ${err.message}`);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`TCP server is listening on ${HOST}:${PORT}`);
  console.log(`Files directory: ${FILES_DIR}`);
});
