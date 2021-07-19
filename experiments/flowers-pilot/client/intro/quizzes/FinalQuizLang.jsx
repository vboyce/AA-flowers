import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

export default class FinalQuizLang extends React.Component {
  state = {
    selection: ""};

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
      if (this.state.selection == "A") {
        //lang condition
        AlertToaster.show({
          message:
            "This solution wiuld give you a low profit. The bars above the flowers represent their worth, so there are better solutions on the page. Please try again!",
        });
      }
      else if (this.state.selection == "B" || this.state.selection == "F") {
        //nonlang condition
        AlertToaster.show({
          message:
            "While this flower might have a good value, there are flowers with a guarenteed high profit. Remember: the flowers hidden from you are revealed to your teammates. There is a better option on the page. Please try again!",
        });
      }
      else if (this.state.selection == "C" || this.state.selection == "D") {
        AlertToaster.show({
          message:
            "This flower will already be chosen by another player. While you CAN select this flower, you will split the profit with a partner. There is a better option on the page. Please try again!",
        });
      }
      else {
        AlertToaster.show({
          message:
            "This is the best solution, good job. This will give your team the highest possible profit for this round. Congrats!",
        });
        this.props.onNext();
      }
  }

  render() {
    const { hasPrev, onPrev, game, treatment } = this.props;
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"}> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-form-group">
              <div className="bp3-form-content">
              <p>Please study the image below and answer the question at the bottom of the page.</p>
              <img width ="800px" src="/experiment/tutorial_images/quiz-example-lang.png"  border="1" HSPACE="25"/>
                <RadioGroup
                  label="In the above image, which flower should you select?"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.selection}
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
