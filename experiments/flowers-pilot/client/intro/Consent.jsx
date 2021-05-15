import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";
import BrowserDetection from "react-browser-detection";

export default class Consent extends React.Component {
  static renderConsent() {
    return (
      <Centered>
        <div className="instructions">
        <div className="smallimage">
            <left><img width="300px" src="/experiment/stanford.png" /></left>
          </div>
          <p>
          If you agree to take part in this research, you will play a series of communication games
            with other participants: one of you will describe a picture so the others can choose it out of
            a lineup of other pictures. This study will take approximately 30 minutes. </p>

            <p class="block-text" id="legal">By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology. If you have questions about this research, please contact Michael C. Frank at mcfrank@stanford.edu. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at irbnonmed@stanford.edu. </p>
            <p class="block-text" id="legal">Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your confidentiality is assured; the researchers who have requested your participation will not receive any personal information about you.
</p>
            <p class="block-text" id="legal">Note however that we have recently been made aware that your public Amazon.com profile can be accessed via your
    worker ID if you do not choose to opt out. If you would like to opt out of this feature, you may follow instructions
    available <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=16465241">here</a>.</p>

          <ConsentButton text="I AGREE" />
</div>
      </Centered>
    );
  }

  renderNoFirefox = () => {
    console.log("this is fire fox");
    return (
      <div className="consent">
        <h1 className="bp3-heading" style={{ textAlign: "center", color: "red" }}>
          DO NOT USE FIREFOX!!
        </h1>
        <p style={{ textAlign: "center" }}>
          Please, don't use firefox! It breaks our game and ruins the experience
          for your potential teammates!
        </p>
      </div>
    );
  };

  render() {
    const browserHandler = {
      default: browser =>
        browser === "firefox" ? this.renderNoFirefox() : Consent.renderConsent()
    };

    return (
      <Centered>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </Centered>
    );
  }
}
