import React from "react";

import Tangram from "./Tangram.jsx";
import Timer from "./Timer.jsx";
import { HTMLTable } from "@blueprintjs/core";
import { StageTimeWrapper } from "meteor/empirica:core";
import _ from "lodash";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    // We want each participant to see tangrams in a random but stable order
    // so we shuffle at the beginning and save in state
    this.state = {
      activeButton: false
    };
  }

  render() {
    const { game, round, stage, player } = this.props;
    const tangrams= round.get('context')
    const tangramlist = player.get('imageOrder');
    let tangramsToRender;
    if (tangramlist) {
      tangramsToRender = tangramlist.map((tangram, i) => (
        <Tangram
          key={tangram}
          name={tangram}
          tangram={tangrams[tangram]["location"]}
          utility={tangrams[tangram].blinded==player._id?"":tangrams[tangram]["utility_image"]}
          tangram_num={i}
          round={round}
          stage={stage}
          game={game}
          player={player}
          />
      ));
    }

    let instructions = ""
    let explanation;
    let incrementView;
    if (stage.name=="selection"){
     instructions =  "Click on what you want to plant."}
    if (stage.name=="feedback"){
      incrementView = "\+" + (player.get("scoreIncrement")||0).toFixed(2)
      let condition = game.get("condition")
      let clickLength = player.get("clickLength")

      if(player.get("clicked") == false) {
        instructions = "You didn't select an image!"
      } else if(condition == "competCartel") {

        if(clickLength == 1) {
          instructions = "Great! No one else selected the same image!"
          explanation = "You got the full bonus!"
        } else {
          let numPeople = clickLength == 2 ?  "One person" : "Two people"
          let all = clickLength ==2 ? "both" : "all"
          instructions =  "Uh oh! " + numPeople + " selected the same image as you."
          explanation = "So you "+all+" got a clover instead! This lowered your bonus."
          }
        }
        else if (condition=="coopMulti"){
          if(clickLength==1){
            instructions="Great! You all selected different images!"
            explanation = "You got the full bonuses!"
          }else{
            let numPeople = clickLength==2 ? "Some people": "Everyone"
            instructions="Uh oh! "+ numPeople+" selected the same image and got a clover instead."
            explanation="This lowered your bonus."
          }
        }

      }

    return (
      <div className="task">
        <div className="board">
          <h2 className="roleIndicator"> {instructions}</h2>
          <h3 className="roleIndicator"> {explanation} <div style = {{color: "green"}}> {incrementView} </ div> </h3>
          <div className="all-tangrams">
            <div className="tangrams">
              {tangramsToRender}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
