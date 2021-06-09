import React from "react";
import Author from "./Author";

export default class ChatLog extends React.Component {
  state = { comment: "" };

  
  handleChange = e => {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const text = this.state.comment.trim();
    if (text !== "") {
      const { round, player } = this.props;
      const room = player.get('roomId')
      round.append("chat", {
        text,
        playerId: player._id,
        target: round.get('target'),
        role: player.get('role'),
        type: "message"
      });
      this.setState({ comment: "" });
    }
  };

  render() {
    const { comment } = this.state;
    const { messages, player, game } = this.props;

    const inputDisplay = game.treatment.chatEnabled ? "" : "none";

    return (
      <div className="chat bp3-card">
        <Messages game={game} messages={messages} player={player} />
        <form onSubmit={this.handleSubmit}>
          <div className="bp3-control-group" style={{display:inputDisplay}} >
            <input
              name="comment"
              type="text"
              className="bp3-input bp3-fill"
              placeholder="Enter chat message"
              value={comment}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <button type="submit" className="bp3-button bp3-intent-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const chatSound = new Audio("experiment/unsure.mp3");
class Messages extends React.Component {
  componentDidMount() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
      chatSound.play();
    }
  }

  render() {
    const { messages, player, game } = this.props;

    return (
      <div className="messages" ref={el => (this.messagesEl = el)}>
        {messages.length === 0 && game.treatment.chatEnabled ? (
          <div className="empty">No messages yet...</div>
        ) : messages.length === 0 && !(game.treatment.chatEnabled) ? (
          <div className="empty">No actions taken yet...</div>
        ) : null}
        {messages.map((message, i) => (
           <Message key={i} message={message} self={message.subject ? player._id === message.subject._id : null} />   
        ))}
      </div>
    );
  }
}

class Message extends React.Component {
  render() {
    const { text, subject, type } = this.props.message;
    const { self } = this.props;
    return (
      <div className="message">
        <Author player={subject} self={self} type = {type} />
        {text}
      </div>
    );
  }
}


