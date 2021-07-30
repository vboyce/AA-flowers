import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GroupQuizCoop extends React.Component {

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
      player.get("nParticipants") !== game.treatment.num_players.toString() ||
      player.get("knowledge") !== "everyplayersomeflower" ||
      player.get("imageCount") !== "6"  ||
      player.get("timeOut") !== "0" ||
      player.get("flowerWorth") !== "9" ||
      player.get("questionOne") !== "C" ||
      player.get("questionTwo") !== "C" ||
      player.get("pictures") !== "different") {
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
                  label="Select the true statement:"
                  onChange={this.handleRadioChange}
                  selectedValue={player.get("knowledge")}
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
              <div className="bp3-form-content">
              <p>In the image below, if ONE partner selected image C, which image is the best for YOU?</p>
              <img width ="400px" src="/experiment/tutorial_images/quiz-example-hard.png"  border="1" HSPACE="25"/>
                <RadioGroup
                  label=""
                  onChange={this.handleRadioChange}
                  selectedValue={player.get("questionOne")}
                  name="questionOne"
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
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
              <p>In the image below, if ONE partner selected image A, which image is the best for YOU?</p>
              <img width ="400px" src="/experiment/tutorial_images/quiz-example-hard.png"  border="1" HSPACE="25"/>
                <RadioGroup
                  onChange={this.handleRadioChange}
                  selectedValue={player.get("questionTwo")}
                  name="questionTwo"
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
                </RadioGroup>
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

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="time-out">
                If a player does NOT choose an image before the time is up
                then their score in that task will be:
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
                  value={player.get("flowerWorth")}
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
