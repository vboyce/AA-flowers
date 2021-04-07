import Empirica from "meteor/empirica:core";

import "./callbacks.js";
import { targetSets } from "./constants";
import _ from "lodash";



// gameInit is where the structure of a game is defined.  Just before
// every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.  You
// must then add rounds and stages to the game, depending on the
// treatment and the players. You can also get/set initial values on
// your game, players, rounds and stages (with get/set methods), that
// will be able to use later in the game.
Empirica.gameInit((game, treatment) => {
  console.log(
    "Game with a treatment: ",
    treatment,
    " will start, with workers",
    _.map(game.players, "id")
  );


  // Sample whether to use tangram set A or set B
  game.set("targetSet", 'setA'); 
  game.set('context', targetSets['setA']);
  
  //console.log(game.get('context'))
  const reps = treatment.rounds;
  const numTargets = game.get('context').length;
  console.log(numTargets)
  const info = {
    numTrialsPerBlock : numTargets,
    numBlocks : reps,
    numTotalTrials: reps * numTargets,
    numPlayers: game.players.length
  };
  
  // I use this to play the sound on the UI when the game starts
  game.set("justStarted", true);

  // Make role list

    // Loop through repetition blocks
    _.times(reps, repNum => {
        mixed_targets=_.shuffle(game.get('context'))
      // Loop through targets in block

      _.times(numTargets, targetNum => {      
        const round = game.addRound();
        //round.set('target', mixed_targets[targetNum]);
        round.set('context', mixed_targets[targetNum])
        round.set('targetNum', targetNum);
        round.set('repNum', repNum);
        round.set('trialNum', repNum * numTargets + targetNum);
        round.set('numPlayers', game.players.length)
                
        round.addStage({
          name: "selection",
          displayName: "Selection",
          durationInSeconds: treatment.selectionDuration
        });
        round.addStage({
          name: "feedback",
          displayName: "Feedback",
          durationInSeconds: treatment.feedbackDuration
        });
      });
    });
});

