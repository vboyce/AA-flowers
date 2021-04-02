import React from "react";

import { Centered } from "meteor/empirica:core";

export const names = [
  "Felu",
  "Wepi",
  "Dace",
]; // for the players names to match avatar color

// Blue avatar names and color codes:
export const avatarNames = [
  "Leah",
  "Ethan",
  "Gabriel",
]// to do more go to https://jdenticon.com/#icon-D3

export const nameColors = [
  "#59C7B1",
  "#A8385F",
  "#996832"
]



export default class SocialInteractionDetails extends React.Component {
  state = {
    satisfied: false
  };

  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <img src={player.avatar} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.nameColor }}>
          {player.name}
          {self ? " (You)" :  player.role=="listener"? " (Listener)": " (Speaker)"}        </span>
      </div>
    );
  }

  render() {
    console.log(this.props)
    const {game, hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const player = {
      _id: 0,
      name: names[0],
      nameColor: nameColors[0],
      avatar: `/avatars/jdenticon/${avatarNames[0]}`,
      role: "listener",
    };

    const otherPlayers = [
      {
        _id: 1,
        name: names[1],
        nameColor: nameColors[1],
        avatar: `/avatars/jdenticon/${avatarNames[1]}`,
        role: "speaker",
      },
      {
        _id: 2,
        name: names[2],
        nameColor: nameColors[2],
        avatar: `/avatars/jdenticon/${avatarNames[2]}`,
        role:"listener"
      }
    ];

    return (
      <Centered>
        <div className="instructions">
        <h1 className={"bp3-heading"}> Team Details</h1>

          <p>
            To help you identify yourself and differentiate each other in the
            team, we will assign an icon and a name to you when the game starts (as shown
            in the following example). This also shows who has what role. 
          </p>
          <br />
        <div className="status">
          <div className="players bp3-card">
            {this.renderPlayer(player, true)}
            {otherPlayers.map(p => this.renderPlayer(p))}        
          </div>
      </div>

          <br />
         <p>
            You and your teammates have{" "}
            {Math.ceil(treatment.selectionDuration / 60.0)} minutes to
            select an image on each repetition. If you do not select an image in this time frame, you will automatically{" "}
            <strong>progress to the next task when the time is up</strong> and will not get a bonus,
            so please stay focused.
          </p>
          <p>There will be <b>12 pictures shown at a time</b>. As a group, you will go through the all the pictures {treatment.rounds} times,
            so each picture can appear as the target multiple times.</p>

            <p>The same person will be the Speaker for the entire game.</p>
         
 
          <p>
            You may communicate with your teammates through the in-game
            chat. Whatever you write will appear to your teammates. {" "}
            You can use the chat function however you like, but please note that 
            <strong> the Speaker must send a message before Listeners can make their selections</strong>.
          </p>
          <p>
            Note that the game allows for simultaneous and real-time actions.
            Each trial will only end after all the listeners have made a selection (or the timer runs out).</p>

            <p>At that time, everyone will be given feedback: the <b>Speaker</b> will see which picture
            each Listener selected, and the <b>Listeners</b> will each see whether their selection was correct or not.</p>

            
         

          <button
            type="button"
            className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="bp3-button bp3-intent-primary"
            onClick={onNext}
            disabled={!hasNext}
          >
            Next
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
          </button>
          </div>
      </Centered>
    );
  }
}
