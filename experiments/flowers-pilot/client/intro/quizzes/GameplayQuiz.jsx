import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GameplayQuiz extends React.Component {
  state = {
    knowledge: "",
    flowerWorth: ""
  };

  componentDidMount() {
    const { game } = this.props;
    document.querySelector("main").scrollTo(0,0)
    this.state.num_players = game.treatment.playerCount;
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

  handleEnabledChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: !this.state[el.name] });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
    if (
      this.state.knowledge !== "everyplayersomeflower" ||
      this.state.flowerWorth !== "1") {
      AlertToaster.show({
        message:
          "Sorry, you have one or more mistakes. Please ensure that you answer the questions correctly, or go back to the instructions",
      });
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, onPrev, game, treatment } = this.props;
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"}> Quiz </h1>
          <form onSubmit={this.handleSubmit}>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Select the true statement:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.knowledge}
                  name="knowledge"
                  required
                >
                  <Radio
                    label="Every player will see the price of every flower."
                    value="everyplayerflower"
                  />
                  <Radio
                    label="Every player will see the price of some, but not all, flowers."
                    value="everyplayersomeflower"
                  />
                  <Radio
                    label="Some, but not all, players will be missing the price of all flowers."
                    value="someplayernoflower"
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="flower-worth">
                If you and your 2 other partners select a flower worth $3, how much $ will you get?
              </label>
              <div className="bp3-form-content">
                <input
                  id="flowerWorth"
                  className="bp3-input"
                  type="number"
                  min="-10"
                  max="10"
                  step="1"
                  dir="auto"
                  name="flowerWorth"
                  value={this.state.flowerWorth}
                  onChange={this.handleChange}
                  required
                />
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
