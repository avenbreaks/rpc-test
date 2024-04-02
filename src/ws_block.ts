import pkg from 'websocket';
const { client: WebSocket } = pkg;

const wsClient = new WebSocket();

wsClient.on('connectFailed', (error) => {
  console.error('Connection failed:', error);
});

wsClient.on('connect', (connection) => {
  console.log('Connected to Geth WebSocket');

  connection.on('error', (error) => {
    console.error('Connection error:', error);
  });

  connection.on('close', () => {
    console.log('Connection closed');
  });

  connection.on('message', (message: pkg.Message) => {
    console.log(
      'Received:',
      message.type === 'utf8' ? message.utf8Data : message.binaryData
    );
  });

  const payload = JSON.stringify({
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_blockNumber',
    params: [],
  });

  connection.send(payload);
});

const wsUrl = process.argv[2];

if (!wsUrl) {
  console.error('Please provide an Ethereum RPC endpoint URL as an argument.');
  process.exit(1);
}

wsClient.connect(wsUrl);