import Empirica from "meteor/empirica:core";
import {names, avatarNames, nameColors} from './constants.js';
import _ from "lodash";

// //// Avatar stuff //////

// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart((game) => {
  const players = game.players;
  console.debug("game ", game._id, " started");

  //const targets = Map(game.get('context'));
  players.forEach((player, i) => {
    //player.set("tangrams", _.shuffle(targets));
    player.set("name", names[i]);
    player.set("avatar", `/avatars/jdenticon/${avatarNames[i]}`);
    player.set("nameColor", nameColors[i]);
    player.set("bonus", 0);
  });

  const flowers= game.get("flowers")
  const flower_names = _.zipObject(flowers.map(a => a.label),flowers.map( ()=> ""))
  const otherflowers=game.get("otherflowers")
  //const otherflower_names = _.zipObject(otherflowers.map(a => a.label),otherflowers.map( ()=> ""))

  players.forEach((player, i) => {
    //player.set("tangrams", _.shuffle(targets));
    player.set("flower_labels", flower_names)
    player.set("flowers", _.shuffle(flowers))
    let othersample = _.slice(_.shuffle(otherflowers),0,4) //randomly choose 4 to show
    player.set("otherflowers", othersample) 
    player.set("otherflower_labels",_.zipObject(othersample.map(a => a.label),othersample.map( ()=> "")))
    let otherplayers=_.filter(_.map(game.players,(a) => a.get("name")), a => a!==player.get("name"))
    player.set("p1",otherplayers[0])
    player.set("p2",otherplayers[1])
  });
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  const players = game.players;
  round.set("chat", []); 
  round.set('submitted', false);
  const tangrams= round.get('context')
  const tangramlist = _.keys(tangrams)
  players.forEach(player => {
    player.set('clicked', false);
    player.set('timeClick', false);
    player.set('scoreIncrement', false);
    player.set('clickLength', false)
    player.set('rawScore',false)
    player.set('imageOrder', _.shuffle(tangramlist))
  });
});

// onRoundStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  const players = game.players;
  console.debug("Round ", stage.name, "game", game._id, " started");
  stage.set("log", [
    {
      verb: stage.name + "Started",
      roundId: stage.name,
      at: new Date(),
    },
  ]);
});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {
  if (stage.name=="selection"){
    const players = game.players;
    const tangrams= round.get('context')
    const scale = game.treatment.scale || 1
    const type = game.treatment.condition
    // 

      let total=0
      let collide=0 
      _.forEach(_.keys(tangrams), tangram => {
        let click=[]
        _.forEach(players, p => {
          if (p.get("clicked")==tangram){click.push(p)}
        })
        if (click){
          let rawScore=click.length==1?tangrams[tangram]["utility"]:2
          let scoreIncrement=rawScore*scale*.01
          collide=collide >click.length? collide: click.length
            _.forEach(click, player=> {
              total=total+rawScore
              console.log(rawScore)
              if (type=="competCartel"){
                const currScore = player.get("bonus") || 0;      
                player.set("bonus", scoreIncrement + currScore);
                player.set("scoreIncrement", scoreIncrement)
                player.set("clickLength", click.length)
                player.set("rawScore", rawScore)
              }
            })
          }
        })
    
      if (type=="coopMulti"){
        let rawScore=total/players.length //average
        let scoreIncrement=rawScore*scale*.01
        _.forEach(players, player => {
          const currScore = player.get("bonus") || 0;  
          if (player.get("clicked")){    // according to instructions, if you don't click you get nothing
            player.set("bonus", scoreIncrement + currScore);
            player.set("scoreIncrement", scoreIncrement)
            player.set("clickLength", collide) //how many unique flowers were clicked
            player.set("rawScore", rawScore)
            console.log(player.get("rawScore"))
          }
        })
      }
    players.forEach(player => {
      round.set('player_' + player._id + '_response', player.get('clicked'));
      round.set('player_' + player._id + '_time', player.get('timeClick'));
      round.set('player_' + player._id + '_utility', player.get('rawScore'));

    });
  }
});

// onRoundEnd is triggered after each round.
Empirica.onRoundEnd((game, round) => {
  
});

// onRoundEnd is triggered when the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd((game) => {
  const players = game.players;

  console.debug("The game", game._id, "has ended");
   //const targets = Map(game.get('context'));
  
 });
 


// ===========================================================================
// => onSet, onAppend and onChanged ==========================================
// ===========================================================================

// onSet, onAppend and onChanged are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.
//
// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.
//
// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.

// // onSet is called when the experiment code call the .set() method
// // on games, rounds, stages, players, playerRounds or playerStages.
/*Empirica.onSet(
  (
    game,
    round,
    stage,
    player, // Player who made the change
    target, // Object on which the change was made (eg. player.set() => player)
    targetType, // Type of object on which the change was made (eg. player.set() => "player")
    key, // Key of changed value (e.g. player.set("score", 1) => "score")
    value, // New value
    prevValue // Previous value
  ) => {
    // Compute score after player clicks
    if (key === "clicked") {
    }
  }
);*/

// // onSet is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend((
//   game,
//   round,
//   stage,
//   players,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//   //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
// });

// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange((
//   game,
//   round,
//   stage,
//   players,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue, // Previous value
//   isAppend // True if the change was an append, false if it was a set
// ) => {
//   // `onChange` is useful to run server-side logic for any user interaction.
//   // Note the extra isAppend boolean that will allow to differenciate sets and
//   // appends.
// });
