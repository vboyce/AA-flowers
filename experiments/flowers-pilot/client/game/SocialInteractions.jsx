import React from "react";
import EventLog from "./EventLog";
import ChatLog from "./ChatLog";
import Timer from "./Timer";

export default class SocialInteractions extends React.Component {
  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image"></span>
        <img src={player.get("avatar")} />
        <span className="name" style={{ color: player.get("nameColor") }}>
          {player.get("name")}
          {self ? " (You)" :  ""}
        </span>
      </div>
    );
  }

  render() {
    const { game, round, stage, player } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    const messages = round.get("chat")
          .map(({ text, playerId }) => ({
            text,
            subject: game.players.find(p => p._id === playerId)
          }));
    const events = stage.get("log").map(({ subjectId, ...rest }) => ({
      subject: subjectId && game.players.find(p => p._id === subjectId),
      ...rest
    }));

    return (
      <div className="social-interactions">
        <div className="status">
          <div className="players bp3-card">
            {this.renderPlayer(player, true)}
            {otherPlayers.map(p => this.renderPlayer(p))}        
          </div>
      </div>
      <div className="status">

        <Timer stage={stage} />

        <div className="total-score bp3-card">

          <h5 className='bp3-heading'>Score</h5>

          <h2 className='bp3-heading'>${(player.get("bonus") || 0).toFixed(2)}</h2>
        </div>
        </div>
        
        
        <ChatLog messages={messages} round={round} stage={stage} player={player} />
      </div>
    );
  }
}
