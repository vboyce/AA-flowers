import React from "react";

import {AlertToaster, Centered} from "meteor/empirica:core";

import {
  Button,
  Classes,
  FormGroup,
  RadioGroup,
  TextArea,
  Intent,
  Radio,
} from "@blueprintjs/core";

export default class PostTestInstructions extends React.Component {
  static stepName = 'instructions'
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };
  
  componentWillMount() {}

  render() {
    const { player, game } = this.props;
    const yourCommunity = game.treatment.teamColor;
    const otherCommunity = yourCommunity == 'red' ? 'blue' : 'red';
    return (
      <Centered>
        <div className="post-test">
          <h1> Thanks for participating!! </h1>
          <br />
          <p>
            Before you go, we have a few final questions for you.
          </p>
          <p>
            You played with three different partners in your {yourCommunity} community today.
            We're planning to follow up with some other members of your {yourCommunity} community that you didn't have a chance to meet, as well as some members of the other {otherCommunity} community.
          </p>
          <p>
            We'll ask them to play the listener role for some additional messages.
            In the next few rounds, please write a message for us to show to these listeners.
            We'll keep track of their responses and give you a $0.10 bonus for each correct response they make (up to $0.80 if they are all correct!)
          </p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="pt-button pt-intent-primary">
            Continue
            <span className="pt-icon-standard pt-icon-key-enter pt-align-right" />
          </button>
        </form>  
      </Centered>
    );
  }
}
