import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

export default class FinalQuizMulti extends React.Component {
 
  componentDidMount() {
    const { game, player } = this.props;
    document.querySelector("main").scrollTo(0,0)
  }

  handleChange = (event) => {
    const { game, player } = this.props;
    const el = event.currentTarget;
    player.set(el.name, el.value.trim().toLowerCase());
  };

  handleRadioChange = (event) => {
    const { game, player } = this.props;
    const el = event.currentTarget;
    console.log("el", el);
    console.log("ev", event);
    player.set(el.name, el.value)
  };

  handleEnabledChange = (event) => {
    const { game, player } = this.props;
    const el = event.currentTarget;
    player.set(el.name, !player.get(el.name))

  };

    handleSubmit = (event) => {
      event.preventDefault();
      const { game, player } = this.props; 

      //we can accept different answers based on the language condition so if the participant is in the nonlang codition, we'll accept any of the 3 high paying bars.
      if (player.get("language") == "true") {
        //lang condition
        AlertToaster.show({
          message:
            "You are in the language condition",
        });
        this.props.onNext();
      }
      else {
        //nonlang condition
        AlertToaster.show({
          message:
            "You are in the nonlanguage condition",
        });
        this.props.onNext();
      }

      } else {
        this.props.onNext();
      }
    };
  }
}
