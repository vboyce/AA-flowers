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



export default class BasicInterfaceInstructions extends React.Component {
  state = {
    satisfied: false
  };
  render() {
    console.log(this.props)
    const {game, hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    var coopCartelBool = (treatment.condition=="coopCartel");
    var competCartelBool = (treatment.condition=="competCartel");
    var lang = (treatment.chatEnabled==true);
    var nonlang = (treatment.chatEnabled!=true);
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game Instructions </h1>
          <p><b> Please read these instructions carefully! You will need to pass a quiz before we will allow you to participate.</b></p>
          <h2 className={"bp4-heading"}> Basic Interface </h2>
          <div class="interface-instructions">
            <div class="instruction-example">

              <div className="instruction-image">
              {lang
                ? <img src="/experiment/tutorial_images/1-familiarize-lang.png" ALIGN="left"/>
                : <img src="/experiment/tutorial_images/1-familiarize-nonlang.png" ALIGN="left"/>}
              </div>
              <hr />
              <p> This is what the ordering system looks like. Please read the following information to familiarize yourself with the interface!</p>
            </div>

            <div className="instruction-example">
              <div className="instruction-image">
              {lang
                ? <img src="/experiment/tutorial_images/2-plants-lang.png" ALIGN="left"/>
                : <img src="/experiment/tutorial_images/2-plants-nonlang.png" ALIGN="left"/>}
              </div>
              <hr />
              <p> This is where I will display the flowers that are available each month. I will give you {treatment.numTargets} options to choose from. </p>
              <p> The flowers will be in <strong>random positions for each player</strong>, so the placement of the flowers on your screen may look different from the placement on your partner's screen.</p>
            </div>
          </div>

<button
  type="button"
  className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
  onClick={onPrev}
  disabled={!hasPrev}>
  Previous
  </button>
  <button
    type="button"
    className="bp3-button bp3-intent-primary"
    onClick={onNext}
    disabled={!hasNext}>
  Next
  <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
  </button>
  </div>
</Centered>
    );
  }
}
