import React from "react";

import { Centered } from "meteor/empirica:core";

export default class AdvancedInterfaceInstructions extends React.Component {
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

          <h2 className={"bp4-heading"}> Advanced Interface </h2>

          <div class="interface-instructions">
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

          </div>

          {lang &&
            <div className="instruction-example">
            <div className="instruction-image"> <img src="/experiment/tutorial_images/5-chat-lang.png" ALIGN="left"/>
            </div>
            <hr />
            <p>You may <strong>communicate with your teammates through the in-game chat.</strong> Whatever you write will appear to your teammates. {" "} You can use the chat function however you like, but please note that these messages <strong>will</strong> be recorded.</p>
          </div>}
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
