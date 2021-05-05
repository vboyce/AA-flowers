import React from "react";

export default class Author extends React.Component {
  render() {
    const { player, self, type } = this.props;

    if(type == "message") {
      return (
      <div className="author">
        <img src={player.get("avatar")} />
        <span className="name" style={{ color: player.get("nameColor") }}>
          {self ? "You" : player.get("name")}
        </span>
      </div>
      );
    } else {

      return(<i> {self ? "You" : player.get("name")} selected an image. </i>)

    }

    
  }
}
