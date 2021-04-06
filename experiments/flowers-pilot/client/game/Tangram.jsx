import { relativeTimeRounding } from "moment";
import React from "react";
import _ from "lodash";


export default class Tangram extends React.Component {
    
  handleClick = e => {
    const { game, tangram, name, utility, tangram_num, stage, player, round } = this.props;
    if (stage.name == 'selection' &
        player.get('clicked') === false) {
      player.set("clicked", name)
      player.set("timeClick", Date.now()-stage.startTimeAt)
      player.stage.submit()

    }
  };

  render() {
    const { game, tangram, name, utility, tangram_num, round, stage, player, ...rest } = this.props;
    const players = game.players
    //const target = round.get("target")
    const row = 1 + Math.floor(tangram_num / 2)
    const column = 1 + tangram_num % 2
    const mystyle = {
      "background" : "url(" + tangram + "), url(" + utility + ")",
      "backgroundSize": "90%, 85%",
      "backgroundRepeat" : "no-repeat, no-repeat",
      "backgroundPosition": "bottom, top",
      "backgroundOrigin" : "content-box",
      "gridRow": row,
      "gridColumn": column,
      "padding" : "10px"
    };

    // Highlight target object for speaker 

    // Show listeners what they've clicked 
    if(stage.name=="selection" & name == player.get('clicked')) {
      _.extend(mystyle, {
        "outline" :  `10px solid #A9A9A9`,
        "zIndex" : "9"
      })
    }


    // Highlight clicked object in green if correct; red if incorrect
    /*if(stage.name=="feedback" & (tangram == player.get('clicked') ||
     (player.get('role')== "speaker" & _.some(players, p => p.get("clicked") == tangram)))) {
      const color = tangram == target ? 'green' : 'red';
      _.extend(mystyle, {
        "outline" :  `10px solid ${color}`,
        "zIndex" : "9"
      })
    }*/


    console.log(tangram)
    console.log(utility)
    let feedback = []; // = [<img src={utility} key={"utility"} />]
    if (stage.name=="feedback"){
      players.forEach(p => {
        if (p.get('clicked')==name){
          feedback.push(<img src={p.get("avatar")} key={p.get("name")} style = {{"height" : "25px"}}/>)
        }
      })
    }
    
    return (
      
      <div
        className="tangram"
        onClick={this.handleClick}
        style={mystyle}
        >
          <div className="feedback" style = {{"top": "0%", "margin-left": "auto", "margin-right": "auto"}} > {feedback}</div>
      </div>
    );
  }
}
