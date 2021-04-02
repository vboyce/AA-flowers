import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GroupQuiz extends React.Component {
  state = {
    nParticipants: "",
    scoreOption: "",
    tangramCount: "",
    timeOut: "",
    chat: "",
    pictures: ""
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
      this.state.nParticipants !== this.state.num_players.toString() ||
      this.state.scoreOption !== "matter" ||
      this.state.tangramCount !== "12"  ||
      this.state.timeOut !== "0" ||
      this.state.chat !== "anyone" ||
      this.state.pictures !== "different") {
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
              <label className="bp3-label" htmlFor="number-of-participants">
                How many participants will play at the same time on your team, including
                yourself?
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
                  value={this.state.nParticipants}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="tangram-count">
                How many pictures will be shown at a time?
              </label>
              <div className="bp3-form-content">
                <input
                  id="tangramCount"
                  className="bp3-input"
                  type="number"
                  min="0"
                  max="20"
                  step="1"
                  dir="auto"
                  name="tangramCount"
                  value={this.state.tangramCount}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Select the true statement about the score:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.scoreOption}
                  name="scoreOption"
                  required
                >
                  <Radio
                    label="The Speaker gets more points if more Listeners make the right choice."
                    value="matter"
                  />
                  <Radio
                    label="The Speaker gets the same number of points if 1 or 2 Listeners makes the right choice."
                    value="constant"
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Select the true statement about the chat:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.chat}
                  name="chat"
                  required
                >
                  <Radio
                    label="Anyone can send messages through the chat."
                    value="anyone"
                  />
                  <Radio
                    label="Only the Speaker can send messages through the chat."
                    value="speaker"
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Select the true statement about the pictures:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.pictures}
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
                If a Listener does NOT choose a tangram before the time is up
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
                  value={this.state.timeOut}
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
