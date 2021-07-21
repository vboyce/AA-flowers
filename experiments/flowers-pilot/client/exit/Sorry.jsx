import React from "react";

import {Centered} from "meteor/empirica:core";

export default class Sorry extends React.Component {
  static stepName = "Sorry";

  render() {    
    const { player, game, hasNext, onSubmit} = this.props;
    let msg;
    switch (player.exitStatus) {
      case "gameFull":
        msg = "All games you are eligible for have filled up too fast...";
        break;
      case "gameLobbyTimedOut":
        msg = "There were NOT enough players for the game to start..";
        break;
      // case "playerLobbyTimedOut":
      //   msg = "???";
      //   break;
      case "playerEndedLobbyWait":
        msg =
          "You decided to stop waiting, we are sorry it was too long a wait.";
        break;
      default:
        msg = "Unfortunately the Game was cancelled...";
      break;
    }

    if(player.exitReason) 
      msg = player.exitReason
    return (
      <Centered>
        <div className="score">
          <h1>Sorry!</h1>
          <p>{msg}</p>

          <p>
            Please fill out the survey on the next page, and then you'll receive the survey code to receive the base pay for your time today.
          </p>
          
          

          <p>
            {hasNext ? (
              <button
              type="button"
              className="bp3-button bp3-intent-primary"
                onClick={() => onSubmit()}
              >
                Next
                <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
              </button>
            ) : (
              ""
            )}
          </p>
        </div>
      </Centered>
    );
  }
}
