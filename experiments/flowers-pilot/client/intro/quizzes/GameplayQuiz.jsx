import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GameplayQuiz extends React.Component {

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
      player.get("knowledge") !== "everyplayersomeflower" ||
      player.get("collision") !== "clover") {
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
            <RadioGroup
              label="What happens if two players select the same flower?"
              onChange={this.handleRadioChange}
              selectedValue={player.get("collision")}
              name="collision"
              required
            >
              <Radio
                label="They both get the full value of their selection."
                value="fullvalue"
              />
              <Radio
                label="The profit is shared 50/50 between the players."
                value="sharedprofit"
              />
              <Radio
                label="Both players get a very low value item, instead."
                value="clover"
              />
            </RadioGroup>
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
