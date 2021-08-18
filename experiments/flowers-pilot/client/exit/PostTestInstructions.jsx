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

  static stepName = "instructions"
  componentWillMount() {}

  render() {
    const { player, game, hasNext, onNext, onSubmit} = this.props;
    return (
      <Centered>
        <div className="post-test">
          <h1> Thanks for participating!! </h1>
          <br />
          <p>
            Before you go, we have a few final questions for you! The following exit quizzes and surveys should take 10-15 minutes. </p>

            <p>Researcher Note: Please answer the questions to the best of your ability. This is an important part of our research, and we appreciate your full attention!</p>
          

          <p>
            {hasNext ? (
              <button
              type="button"
              className="bp3-button bp3-intent-primary"
                onClick={() => onSubmit()}
              >
                Next
                <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
              </button>
            ) : (
              ""
            )}
          </p>
          </div>
      </Centered>
    );
  }
}
