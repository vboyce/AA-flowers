import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";
import BrowserDetection from "react-browser-detection";

export default class Consent extends React.Component {
  static renderConsent() {
    return (
      <Centered>
        <div className="instructions">
        <div className="smallimage">
            <center><img width="300px" src="/experiment/stanford.png" /></center>
          </div>
          <p>
          If you agree to take part in the research, you will play a series of communication games
            with other participants: one of you will describe a picture so the others can choose it out of
            a lineup of other pictures. This study will take approximately 30 minutes. </p>
            
            <p class="block-text" id="legal">By answering the following questions, you are participating in a study being performed by cognitive scientists in the 
          Stanford Department of Psychology. If you have questions about this research, please contact us at 
           <a href="mailto://languagecoglab@gmail.com."> languagecoglab@gmail.com</a>.
    You must be at least 18 years old to participate. Your participation in this research is voluntary. 
    You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences.
    Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you. 
    Note however that we have recently been made aware that your public Amazon.com profile can be accessed via your
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
