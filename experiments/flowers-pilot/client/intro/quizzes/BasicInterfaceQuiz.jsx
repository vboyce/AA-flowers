import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class BasicInterfaceQuiz extends React.Component {
  

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
      player.get("nParticipants") !== game.treatment.playerCount.toString() ||
      player.get("imageCount") !== "6" ||
      player.get("pictures") !== "different") {
      AlertToaster.show({
        message:
          "Sorry, you have one or more mistakes. Please ensure that you answered the questions correctly, or go back to the instructions",
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
          <h1 className={"bp3-heading"}> Basic Interface Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="number-of-participants">
                How many participants will play at the same time on your team, including yourself?
              </label>
              <div className="bp3-form-content">
                <input
                  id="nParticipants"
                  className="bp3-input"
                  type="number"
                  min="0"
                  max="10"
                  step="1"
                  dir="auto"
                  name="nParticipants"
                  value={player.get("nParticipants")}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="flower-count">
                How many images will be shown at a time?
              </label>
              <div className="bp3-form-content">
                <input
                  id="imageCount"
                  className="bp3-input"
                  type="number"
                  min="0"
                  max="20"
                  step="1"
                  dir="auto"
                  name="imageCount"
                  value={player.get("imageCount")}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Select the true statement about the pictures:"
                  onChange={this.handleRadioChange}
                  selectedValue={player.get("pictures")}
                  name="pictures"
                  required
                >
                  <Radio
                    label="Everyone will see the same pictures in the same places in the grid."
                    value="same"
                  />
                  <Radio
                    label="Pictures will be mixed up and in different places for different people."
                    value="different"
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
