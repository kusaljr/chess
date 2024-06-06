var rn_bridge = require('rn-bridge');

const {Chess} = require('chess.js');
const {getBestMove} = require('./chess-ai');
let chessInstance = null;

rn_bridge.channel.on('start', msg => {
  chessInstance = new Chess();
  rn_bridge.channel.send('Chess game started');
});

rn_bridge.channel.on('move', msg => {
  if (!chessInstance) {
    rn_bridge.channel.send('Chess game not started');
    return;
  }
  try {
    const user_move = JSON.parse(msg);
    const move = chessInstance.move(user_move);

    if (!move) {
      rn_bridge.channel.send('Invalid move');
      return;
    }

    console.log(chessInstance.ascii());

    const bestMove = getBestMove(chessInstance);
    const chessMove = chessInstance.move(bestMove);

    rn_bridge.channel.send(
      JSON.stringify({
        from: chessMove.from,
        to: chessMove.to,
      }),
    );
  } catch (error) {
    console.log(error);
    rn_bridge.channel.send('Error Happened');
  }
});

rn_bridge.channel.send('Node was initialized.');
