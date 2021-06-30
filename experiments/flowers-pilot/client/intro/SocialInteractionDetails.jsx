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
    var lang = (treatment.chatEnabled==true);
    var nonlang = (treatment.chatEnabled!=true);
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game Instructions </h1>
          <p><b> Please read these instructions carefully! You will need to pass a quiz before we will allow you to participate.</b></p>

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

            <div className="instruction-example">
              <div className="instruction-image">              {lang
                              ? <img src="/experiment/tutorial_images/3-icon-lang.png" ALIGN="left"/>
                              : <img src="/experiment/tutorial_images/3-icon-nonlang.png" ALIGN="left"/>}
              </div>
              <hr />
              <p> Each farmer is represented by an icon at the top. You will keep the same icon/name throughout your game. </p>
            </div>
            <div className="instruction-example">
            <div className="instruction-image">              {lang
                            ? <img src="/experiment/tutorial_images/4-score-timer-lang.png" ALIGN="left"/>
                            : <img src="/experiment/tutorial_images/4-score-timer-nonlang.png" ALIGN="left"/>}
            </div>
              <hr />
              <p>Your total score is the amount of money you've earned so far. <strong>You will be paid this amount as a bonus at the end of the game.</strong> Keep an eye on it! </p>
              <p>You and your teammates have{" "} {Math.ceil(treatment.selectionDuration / 60.0)} minutes to select an item each round. <strong> If you do not select an image in this time frame, you will automatically{" "} progress to the next task when the time is up</strong> and you will not get a bonus, so please stay focused. </p>
              <p>You will have one chance to make a choice. You will not be able to change your selection once you click a flower. <strong>Please be sure of your selection before you make it!</strong></p>
            </div>
            {lang &&
              <div className="instruction-example">
              <div className="instruction-image"> <img src="/experiment/tutorial_images/5-chat-lang.png" ALIGN="left"/>
              </div>
              <hr />
              <p>You may <strong>communicate with your teammates through the in-game chat.</strong> Whatever you write will appear to your teammates. {" "} You can use the chat function however you like, but please note that these messages <strong>will</strong> be recorded.</p>
            </div>}

            <div className="instruction-example">
            <div className="instruction-image">              {lang
                            ? <img src="/experiment/tutorial_images/6-bar-lang.png" ALIGN="left"/>
                            : <img src="/experiment/tutorial_images/6-bar-nonlang.png" ALIGN="left"/>}
            </div>
              <hr />
              {coopCartelBool && <p>The bars above the flowers represent how much each flower is worth on the market. The longer the bar, the more the flower is expected to sell. <strong>Remember, if all {treatment.playerCount} of you select the same flower, you will recieve {treatment.playerCount}x the profit.</strong> </p>}

              {competCartelBool && <p>The bars above the flowers represent how much each flower is worth on the market. The longer the bar, the more the flower is expected to sell. <strong>Remember, if all {treatment.playerCount} of you select the same flower, you will recieve 1/{treatment.playerCount} the profit.</strong> </p>}

              <p>The bars above the flowers also represent your expertise as a flower farmer! You may not know much about some flowers, so those flowers are missing a profit bar. <strong>Your partners will have information about the flowers that are missing profit bars for you, but they might be missing information about flowers that you can see! </strong></p>
            </div>

            <div className="instruction-example">
            {lang &&
              <div className="instruction-image">
              {coopCartelBool && <img src="/experiment/tutorial_images/7-feedback-collab-lang.png" ALIGN="left"/>}
              {competCartelBool && <img src="/experiment/tutorial_images/7-feedback-compet-lang.png" ALIGN="left"/>}
              </div>}
            {nonlang &&
              <div className="instruction-image">
              {coopCartelBool && <img src="/experiment/tutorial_images/7-feedback-collab-nonlang.png" ALIGN="left"/>}
              {competCartelBool && <img src="/experiment/tutorial_images/7-feedback-compet-nonlang.png" ALIGN="left"/>}
              </div>}

              <hr />
              <p> Note that the game allows for simultaneous and real-time actions. Each trial will only end after all the players have made a selection (or the timer runs out). Once that happens, you'll be told who selected which flower. You'll also get some information about how your score was calculated at the top! </p>
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
