import React from "react";

import SocialInteractions from "./SocialInteractions.jsx";
import Task from "./Task.jsx";

const roundSound = new Audio("experiment/round-sound.mp3");
const gameSound = new Audio("experiment/bell.mp3");
const setTimeout = function(player) {
  if(!player.get('exitTimeoutId')) {
    player.set('exitTimeoutId', Meteor.setTimeout(() => {
      player.set('exited', true);
      player.exit('It looks like one of your partners disconnected before you could finish the experiment!')
    }, 10000))
  }
}
const cancelTimeout = function(player) {
  const id = player.get('exitTimeoutId')
  if(id) {
    Meteor.clearTimeout(id)
    player.set('exitTimeoutId', null)
  }
}

export default class Round extends React.Component {
  componentDidMount() {
    const { game } = this.props;
    if (game.get("justStarted")) {
      //play the bell sound only once when the game starts
      gameSound.play();
      game.set("justStarted", false);
    } else {
      roundSound.play();
    }
  }

  render() {
    const {round, stage, player, game } = this.props;
    const allPlayersOnline = game.players.every(player => player.online);
    const anyPlayersExited = game.players.some(player => player.get('exited'));
    if(!allPlayersOnline || anyPlayersExited) {
      setTimeout(player);
    } else {
      cancelTimeout(player);
    }
    return (
      <div className="round">
        <SocialInteractions game={game} round={round} stage={stage} player={player} />
        <Task game={game} round={round} stage={stage} player={player} />
      </div>
    );
  }
}
