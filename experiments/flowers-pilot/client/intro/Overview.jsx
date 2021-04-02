import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "@blueprintjs/core";

export default class Overview extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const social = treatment.playerCount > 1;
    return (
      <Centered>
        <div className="instructions">
       
          <h1 className={"bp3-heading"}> Game Overview </h1>

          <p>
            <b> Please read these instructions carefully! You will have to pass a quiz on how the game works before you can play!</b>
          </p>
          
          <p>
            In this task, you will be assigned to a team with {treatment.playerCount -1} other people ({treatment.playerCount} including yourself!).
            You will play a series of communication games with people on your team.
            Everyone on your team will see the same set of pictures, which will look something like this:
          </p>

          <div className="smallimage">
            <center><img width="300px" src="/experiment/tangrams.PNG" /></center>
          </div>

          <p>
            One of the people on the team will be randomly assigned the {" "}
            <strong>Speaker</strong> role and the others will be assigned the {" "}
            <strong>Listener</strong> role.
          </p>

          <p>
            If you are the Speaker, you will see a black box
            secretly marking one of the pictures as the {" "} <strong>target</strong>.
          </p>

          <div className="smallimage">
            <center><img width="300px" src="/experiment/target.PNG" /></center>
          </div>

          <p>
            The Speaker's job is to send a description of the target through the chatbox
            so that the Listeners are able to pick it out of the set. You can write whatever
            description you think will best allow your partners to identify the target.
            Please note that <b>the order of the pictures on your screen is scrambled</b>, so descriptions like "the one on the left" or "the third one" will not
            work. Also, please limit your description to the current target picture: do not
            discuss previous trials or chat about any other topics!
          </p>

          <div className="smallimage">
            <center><img width="300px" src="/experiment/typing.PNG" /></center>
            <br/>
          </div>

          <p>
            After the Speaker sends a message, the Listeners will read it and 
            <b> each click the picture they believe is the target</b>.  They are also
            allowed to respond by sending messages back through the chatbox
            until they are ready to make a selection. </p>

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
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right"/>
          </button>
        </div>
      </Centered>
    );
  }
}
