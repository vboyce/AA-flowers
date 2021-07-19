import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GameplayInstructions extends React.Component {
  state = {
    satisfied: false
  };
  render() {
    console.log(this.props)
    const {game, hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    var coopCartelBool = (treatment.condition=="coopCartel");
    var competCartelBool = (treatment.condition=="competCartel");
    var coopMultiBool = (treatment.condition=="coopMulti");
    var lang = (treatment.chatEnabled==true);
    var nonlang = (treatment.chatEnabled!=true);
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game Instructions </h1>
          <p><b> Please read these instructions carefully! You will need to pass a quiz before we will allow you to participate.</b></p>

          <h2 className={"bp4-heading"}> Gameplay </h2>

          <div class="interface-instructions">
          <div className="instruction-example">
          <div className="instruction-image">              {lang
                          ? <img src="/experiment/tutorial_images/6-bar-lang.png" ALIGN="left"/>
                          : <img src="/experiment/tutorial_images/6-bar-nonlang.png" ALIGN="left"/>}
          </div>
            <hr />
            <p>The bars above the flowers represent how much each flower is worth on the market. The longer the bar, the more the flower is expected to sell. </p>

            <p>The bars above the flowers also represent your expertise as a flower farmer! You may not know much about some flowers, so those flowers are missing a profit bar. <strong>Your partners will have information about the flowers that are missing profit bars for you, but they might be missing information about flowers that you can see! </strong></p>
          </div>

          <div className="instruction-example">
          {lang &&
            <div className="instruction-image">
            {coopCartelBool && <img src="/experiment/tutorial_images/7-feedback-collab-lang.png" ALIGN="left"/>}
            {competCartelBool && <img src="/experiment/tutorial_images/7-feedback-compet-lang.png" ALIGN="left"/>}
            {coopMultiBool && <img src="/experiment/tutorial_images/7-feedback-multi-lang.png" ALIGN="left"/>}
            </div>}
          {nonlang &&
            <div className="instruction-image">
            {coopCartelBool && <img src="/experiment/tutorial_images/7-feedback-collab-nonlang.png" ALIGN="left"/>}
            {competCartelBool && <img src="/experiment/tutorial_images/7-feedback-compet-nonlang.png" ALIGN="left"/>}
            {coopMultiBool && <img src="/experiment/tutorial_images/7-feedback-multi-nonlang.png" ALIGN="left"/>}
            </div>}

            <hr />
            <p>When you have decided which flower to plant, you will click on your choice. <strong> You will only have one opportunity to make your selection, and your selection is final.</strong> Please be sure of your decision before making your selection.</p>

            <p> Once all three players have made their selection, or the time runs out, you'll be told who selected which flower. You'll also get some information about how your score was calculated at the top! </p>
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
