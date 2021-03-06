import Empirica from "meteor/empirica:core";

import "./callbacks.js";
import { targetSets, utilities , high_utilities, sequences} from "./constants";
import _ from "lodash";

function chooseImages(flowers, low, high, number, players, blinded){
  //takes a list of flower objects, a list of utilties and a number to select
  //returns the context
  // if blinded, then each flower is labelled with which player won't its utils
  let blinds={}
  if (blinded){
    const order=_.range(number).map(p=> p% players.length)
    blinds=order.map(i => _.assign({},{"blinded":players[i]}))
  }
  const f=_.slice(_.shuffle(flowers),0,number)
  const l=_.slice(_.shuffle(low),0,number-1) // choose n-1 from the normal range
  const h=_.slice(_.shuffle(high),0,1) //choose 1 high
  const u=_.shuffle(_.concat(l,h))
  const values=_.zipWith(f,u,blinds, (a,b,c)=>_.assign({},a,b,c))
  const names=_.map(f, (a)=>a.label)
  const all=_.zipObject(names,values)
  //console.log(all)
  return all
}

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


  game.set("targetSet", treatment.targetSet);
  let sequence=  _.shuffle(sequences[treatment.targetSet])
  //game.set("numBlocks", game.get("sequence").length)
  game.set("color", sequence[0])
  game.set("othercolor", sequence[1])
  game.set("flowers", targetSets[game.get("color")]) 
  game.set("otherflowers", targetSets[game.get("othercolor")])// secondary color used for testing at the end
  game.set("numBlocks", treatment.numBlocks) //hard code for now
  game.set("condition", treatment.condition)
  //console.log(game.get('sequence'))
  const numTargets = treatment.numTargets; 
  const repsPerBlock = treatment.repsPerBlock 
  const numBlocks = game.get("numBlocks")
  const info = {
    numTrialsPerBlock : repsPerBlock,
    numBlocks : numBlocks,
    numTotalTrials: repsPerBlock * numBlocks,
    numPlayers: game.players.length
  };
  const playerIds=_.map(game.players, "_id")
  
  // I use this to play the sound on the UI when the game starts
  game.set("justStarted", true);

  // Make role list

    // Loop through repetition blocks
    _.times(numBlocks, blockNum => {
        //const color=game.get('sequence')[blockNum] 
        const color=game.get("color")
      _.times(repsPerBlock, repNum => {      
        const round = game.addRound();
        //round.set('target', mixed_targets[targetNum]);
        round.set('context', chooseImages(targetSets[color],utilities,high_utilities, numTargets, playerIds, treatment.partial))
        round.set('repNum', repNum);
        round.set('blockNum', blockNum);
        round.set('trialNum', blockNum * repsPerBlock + repNum);
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

