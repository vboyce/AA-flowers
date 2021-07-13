import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "@blueprintjs/core";

export default class Overview extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const social = treatment.playerCount > 1;
    var coopCartelBool = (treatment.condition=="coopCartel");
    var coopMultiBool = (treatment.condition=="coopMulti");
    var competCartelBool = (treatment.condition=="competCartel");
    var lang = (treatment.chatEnabled==true);
    var nonlang = (treatment.chatEnabled==false);
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
            <div><p>I see here that you’re <b>sharing</b> a farm with {treatment.playerCount - 1} other farmers ({treatment.playerCount} players total). You and your partners will need to decide {lang ? 'together' : 'independently'} which seed to order. My ordering system is a little complicated, so I’ll give you a discount if you order the same seeds as your partners!  </p>
            <p>This means if all {treatment.playerCount} of you order the same flower you’ll each get {treatment.playerCount}x the profit. If {treatment.playerCount - 1} of you order the same flower, those {treatment.playerCount - 1} partners will get {treatment.playerCount - 1}x the profit.  </p> </div>}

            {competCartelBool &&
              <div><p>I sell seeds to farmers all over the area, but only have enough seeds for one order per flower. You and the {treatment.playerCount - 1} other farmers will have to decide {lang ? 'together' : 'independently'} who will order which seed for the month. My ordering system doesn’t allow multiple orders per seed, so if you order the same seeds as another farmer, you’ll have to share the profit between yourselves! </p>
              <p> For example, if all {treatment.playerCount} of you order the same flower worth 9 points, you’ll each earn 9/3=3 points. If only {treatment.playerCount-1} players select the same flower, those {treatment.playerCount-1} players will win 9/2=4.5 points. If you are the only player to select that flower, you will earn all 9 points! </p> </div>}

              {coopMultiBool &&
                <div><p>I see here that you’re <b>sharing</b> a farm with {treatment.playerCount - 1} other farmers. You and your partners will need to decide {lang ? 'together' : 'independently'} which seed to order. Each player will choose a flower and, as a team, you'll get the sum of your selections divided between the players.</p>
                <p> For example, if all {treatment.playerCount} players select the same flower worth 9 points, the team will recieve 9/3=3 points. If you select a flower worth 9 points, and your {treatment.playerCount-1} other teammates select a flower worth 10 points, the team will receive 19/3=6.33 points. Double the value!</p> </div>}
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
