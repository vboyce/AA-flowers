import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GroupQuizCompet extends React.Component {
    state = {
      nParticipants: "",
      knowledge: "",
      imageCount: "",
      timeOut: "",
      questionOne: "",
      questionTwo:"",
      pictures: "",
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
        this.state.nParticipants !== this.state.num_players.toString() ||
        this.state.knowledge !== "everyplayersomeflower" ||
        this.state.imageCount !== "6"  ||
        this.state.timeOut !== "0" ||
        this.state.flowerWorth !== "1" ||
        this.state.questionOne !== "C" ||
        this.state.questionTwo !== "C" ||
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
                    value={this.state.nParticipants}
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
                    value={this.state.imageCount}
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
                <div className="bp3-form-content">
                <p> <hl/>In the image below, if ONE partner selected image A, which image should you select?</p>
                <img width ="400px" src="/experiment/tutorial_images/quiz-example.png" border="1" HSPACE="25"/>
                  <RadioGroup
                    onChange={this.handleRadioChange}
                    selectedValue={this.state.questionOne}
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
                <p> In the image below, if ONE partner selected image C, which image should you select?</p>
                <img width ="400px" src="/experiment/tutorial_images/quiz-example.png"  border="1" HSPACE="25"/>
                  <RadioGroup
                    label=""
                    onChange={this.handleRadioChange}
                    selectedValue={this.state.questionTwo}
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
                    value={this.state.timeOut}
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
