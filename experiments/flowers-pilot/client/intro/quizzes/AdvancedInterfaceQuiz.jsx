import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class AdvancedInterfaceQuiz extends React.Component{


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

    if (
      player.get("timeOut") !== "0" ||
      player.get("timeAmount") !== "3") {
      AlertToaster.show({
        message:
          "Sorry, you have one or more mistakes. Please ensure that you answer the questions correctly, or go back to the instructions",
      });
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, onPrev, game, player, treatment } = this.props;
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"}> Quiz </h1>
          <form onSubmit={this.handleSubmit}>

          <div className="bp3-form-group">
            <label className="bp3-label" htmlFor="time-amount">
              How many minutes will you have to select your flower?
            </label>
            <div className="bp3-form-content">
              <input
                id="timeAmount"
                className="bp3-input"
                type="number"
                min="-10"
                max="10"
                step="1"
                dir="auto"
                name="timeAmount"
                value={player.get("timeAmount")}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="time-out">
                If a player does NOT choose an image before the time is up then their score in that task will be:
              </label>
              <div className="bp3-form-content">
                <input
                  id="timeOut"
                  className="bp3-input"
                  type="number"
                  min="-10"
                  max="10"
                  step="1"
                  dir="auto"
                  name="timeOut"
                  value={player.get("timeOut")}
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
