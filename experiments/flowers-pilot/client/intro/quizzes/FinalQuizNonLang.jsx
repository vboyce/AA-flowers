import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

export default class FinalQuizNonLang extends React.Component {
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
      if (player.get("selection") == "A") {
        //lang condition
        AlertToaster.show({
          message:
            "This solution would give you a low profit. The bars above the flowers represent their worth, so there are better solutions on the page. Please try again!",
        });
      }
      else if (player.get("selection") == "B" || player.get("selection") == "F") {
        //nonlang condition
        AlertToaster.show({
          message:
            "While this flower might have a good value, there are flowers with a guarenteed high profit. There is a better option on this page. Please try again!",
        });
      }
      else {
        AlertToaster.show({
          message:
            "This is a good solution, good job!",
        });
        this.props.onNext();
      }
  }

  render() {
    const { hasPrev, onPrev, game, player, treatment } = this.props;
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"}> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-form-group">
              <div className="bp3-form-content">
              <p>Please study the image below and answer the question at the bottom of the page.</p>
              <img width ="800px" src="/experiment/tutorial_images/quiz-example-nonlang.png"  border="1" HSPACE="25"/>
                <RadioGroup
                  label="In the above image, which flower should you select?"
                  onChange={this.handleRadioChange}
                  selectedValue={player.get("selection")}
                  name="selection"
                  required
                >
                  <Radio
                    label="A"
                    value="A"
                  />
                  <Radio
                    label="B"
                    value="B"
                  />
                  <Radio
                    label="C"
                    value="C"
                  />
                  <Radio
                    label="D"
                    value="D"
                  />
                  <Radio
                    label="E"
                    value="E"
                  />
                  <Radio
                    label="F"
                    value="F"
                  />
                </RadioGroup>
              </div>
            </div>

            <button
              type="button"
              className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
              onClick={onPrev}
              disabled={!hasPrev}
            >
              Back to instructions
            </button>
            <button type="submit" className="bp3-button bp3-intent-primary">
              Submit
              <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
            </button>
          </form>
        </div>
      </Centered>
    );
  }
}
