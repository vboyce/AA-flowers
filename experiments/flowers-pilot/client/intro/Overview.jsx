import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "@blueprintjs/core";

export default class Overview extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const social = treatment.playerCount > 1;
    var coopCartelBool = (treatment.condition=="coopCartel");
    var competCartelBool = (treatment.condition=="competCartel");
    return (
      <Centered>
        <div className="instructions">

          <h1 className={"bp3-heading"}> Introduction </h1>
          <p>

            <b> Please read these instructions carefully! You will need to pass a quiz before we will allow you to participate.</b></p>

          <div className="smallimage">
            <img height="190px" src="/experiment/fred-the-florist.png" ALIGN="left" HSPACE="25" VSPACE="25"/>

            <p> <i>Hello! Congratulations on the purchase of your new flower farm! My name’s Fred the Florist. I sell seeds to all of the farmers in the area. I hear you’re new to the business, so there are a couple of things you should know!</i></p>
            <p> Every month (round), you’ll need to order the seeds for the flower you’ll plant in your flower patch. I feature {treatment.numTargets} flowers a month, but have lots of variety and they’re all guaranteed to turn a profit! </p>
          </div>

          {coopCartelBool &&
            <div><p>I see here that you’re <b>sharing</b> a farm with {treatment.playerCount - 1} other farmers. You and your partners will need to <b>decide together</b> to which seed to order. </p>
            <p>My ordering system is a little complicated, so I’ll give you a discount if you order the same seeds as your partners! This means if all {treatment.playerCount} of you order the same flower you’ll each get {treatment.playerCount}x the profit. If {treatment.playerCount - 1} of you order the same flower, those {treatment.playerCount - 1} partners will get {treatment.playerCount - 1}x the profit.  </p> </div>}

            {competCartelBool &&
              <div><p>I sell seeds to farmers all over the area, but only have enough seeds for one order per flower. You and the {treatment.playerCount - 1} other farmers will have to decide together who will order which seed for the month. </p>
              <p> My ordering system doesn’t allow multiple orders per seed, so if you order the same seeds as another farmer, you’ll have to share the profit between yourselves! This means if all {treatment.playerCount} of you order the same flower you’ll each get 1/{treatment.playerCount} the profit. If {treatment.playerCount - 1} of you order the same flower, those {treatment.playerCount - 1} partners will get 1/{treatment.playerCount - 1} the profit.   </p> </div>}

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
