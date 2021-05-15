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
  render() {
    console.log(this.props)
    const {game, hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    var coopCartelBool = (treatment.condition=="coopCartel");
    var competCartelBool = (treatment.condition=="competCartel");
    return (
      <Centered>
        <div className="instructions">
        <h1 className={"bp3-heading"}> Game Instructions </h1>
        <p><b> Please read these instructions carefully! You will need to pass a quiz before we will allow you to participate.</b></p>

        <div className="instruction-steps">
        <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" border="1" ALIGN = "left" HSPACE="25"/>
          <p> This is what the ordering system looks like. Please read the following information to familiarize yourself with the interface!</p>

        </div>

        <div className="instruction-steps">

          <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" ALIGN="left" border="1" HSPACE="25"/>
          <p> This is where I will display the flowers that are available each month. I will give you {treatment.numTargets} options to choose from. </p>
        </div>

        <div className="instruction-steps">
          <p><hr/>  Each farmer is represented by an icon at the top. You will keep the same icon/name throughout your game. </p>
          <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" ALIGN="top" border="1" HSPACE="25"/>
        </div>

        <div className="instruction-steps">
          <p><hr/>  Your total score is the amount of money you've earned so far. You will be paid this amount as a bonus at the end of the game. Keep an eye on it! </p>
          <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" ALIGN="top" border="1" HSPACE="25"/>
        </div>

        <div className="instruction-steps">
          <p><hr/>  You and your teammates have{" "} {Math.ceil(treatment.selectionDuration / 60.0)} minutes to select an item each round. If you do not select an image in this time frame, you will automatically{" "} <strong>progress to the next task when the time is up</strong> and you will not get a bonus, so please stay focused. </p>
          <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" ALIGN="top" border="1" HSPACE="25"/>
        </div>
        <div className="instruction-steps">
        <p> <hr/> You may communicate with your teammates through the in-game
        chat. Whatever you write will appear to your teammates. {" "}
        You can use the chat function however you like, but please note that these messages <strong>will</strong> be recorded. </p>
          <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" ALIGN="top" border="1" HSPACE="25"/>
        </div>

        <div className="instruction-steps">
        {coopCartelBool && <p><hr/> The bars above the flowers represent how much each flower is worth on the market. The longer the bar, the more the flower is expected to sell. Remember, if all {treatment.playerCount} of you select the same flower, you will recieve a {treatment.playerCount}x bonus</p>}.

        {competCartelBool && <p><hr/> The bars above the flowers represent how much each flower is worth on the market. The longer the bar, the more the flower is expected to sell. Remember, if all {treatment.playerCount} of you select the same flower, you will recieve a 1/{treatment.playerCount}x penalty </p>}.
          <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" ALIGN="top" border="1" HSPACE="25"/>
        </div>

        <div className="instruction-steps">

        <p> <hr/>Note that the game allows for simultaneous and real-time actions.
        Each trial will only end after all the listeners have made a selection (or the timer runs out). Once that happens, you'll be told who selected which flower. You'll also get some information about how your score was calculated at the top!</p>

        {coopCartelBool && <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" ALIGN="top" border="1" HSPACE="25"/>}
        {competCartelBool && <img width ="400px" src="/experiment/tutorial_images/interface_temp.png" ALIGN="top" border="1" HSPACE="25"/>}

        </div>

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
