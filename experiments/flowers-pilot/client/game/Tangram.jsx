import { relativeTimeRounding } from "moment";
import React from "react";
import _ from "lodash";


export default class Tangram extends React.Component {
    
  handleClick = e => {
    const { game, tangram, tangram_num, stage, player, round } = this.props;
    const speakerMsgs = _.filter(round.get("chat"), msg => {
      return msg.role == 'speaker'    })
    const speaker = _.find(game.players, p => p.get('role') === "speaker");
    // only register click for listener and only after the speaker has sent a message
    if (stage.name == 'selection' &
        speakerMsgs.length > 0 &
        player.get('clicked') === false &
        player.get('role') == 'listener') {
      player.set("clicked", tangram)
      if(player.get("clicked")==round.get("target")){
        const count=round.get("countCorrect")
        round.set("countCorrect", count+1)
      }
      player.set("timeClick", Date.now()-stage.startTimeAt)
      if (!round.get('submitted')){
        speaker.stage.submit()
        round.set('submitted', true)
      }
      player.stage.submit()

    }
  };

  render() {
    const { game, tangram, tangram_num, round, stage, player, ...rest } = this.props;
    const players = game.players
    const target = round.get("target")
    const row = 1 + Math.floor(tangram_num / 4)
    const column = 1 + tangram_num % 4
    const mystyle = {
      "background" : "url(" + tangram + ")",
      "backgroundSize": "cover",
      "gridRow": row,
      "gridColumn": column
    };

    // Highlight target object for speaker 
    if(target == tangram & player.get('role') == 'speaker') {
      _.extend(mystyle, {
        "outline" :  "10px solid #000",
        "zIndex" : "9"
      })
    }

    // Show listeners what they've clicked 
    if(stage.name=="selection" & tangram == player.get('clicked')) {
      _.extend(mystyle, {
        "outline" :  `10px solid #A9A9A9`,
        "zIndex" : "9"
      })
    }


    // Highlight clicked object in green if correct; red if incorrect
    if(stage.name=="feedback" & (tangram == player.get('clicked') ||
     (player.get('role')== "speaker" & _.some(players, p => p.get("clicked") == tangram)))) {
      const color = tangram == target ? 'green' : 'red';
      _.extend(mystyle, {
        "outline" :  `10px solid ${color}`,
        "zIndex" : "9"
      })
    }
    
    let feedback = []
    if (player.get('role') == 'speaker' &  stage.name=="feedback"){
      players.forEach(player => {
        if (player.get('clicked')==tangram){
          feedback.push(<img src={player.get("avatar")} key="player" />)
        }
      })
    }
    
    return (
      <div
        className="tangram"
        onClick={this.handleClick}
        style={mystyle}
        >
          <div className="feedback"> {feedback}</div>
      </div>
    );
  }
}
