import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

export default class FinalQuizMulti extends React.Component {
  state = {
    selection: ""};

    componentDidMount() {
      const { game } = this.props;
      this.state.language = game.treatment.chat;
    }

    handleChange = (event) => {
      const el = event.currentTarget;
      this.setState({ [el.name]: el.value.trim().toLowerCase() });
    };

    handleRadioChange = (event) => {
      const el = event.currentTarget;
      console.log("el", el);
      console.log("ev", event);
      this.setState({ [el.name]: el.value });
    };

    handleSubmit = (event) => {
      event.preventDefault();

      //we can accept different answers based on the language condition so if the participant is in the nonlang codition, we'll accept any of the 3 high paying bars.
      if (this.state.language == "true") {
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
