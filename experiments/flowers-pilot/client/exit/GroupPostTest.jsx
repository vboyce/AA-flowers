import React from "react";

import {AlertToaster, Centered} from "meteor/empirica:core";
import _ from "lodash";

import {
  Button,
  Classes,
  FormGroup,
  RadioGroup,
  TextArea,
  Intent,
  Radio,
} from "@blueprintjs/core";

export class OwnColorTest extends React.Component {
  static stepName = "owncolortest"
  handleChange = (event) => {
    const { game, player } = this.props;
    const el = event.currentTarget;
    console.log(player.get("flower_labels"))
    console.log(el.name)
    console.log(el.value)
    let labels=player.get("flower_labels")
    labels[el.name] =el.value;
    player.set("flower_labels", labels)
    //console.log("here")
  };

  handleSubmit = (event) => {
    const { player } = this.props;
    event.preventDefault();
    console.log(player)
    if (_.values(player.get("flower_labels")).includes("")) {
      AlertToaster.show({
        message: "Sorry, you have not completed all the questions above. Please answer the questions before submitting!"
      });
    }  else {
      console.log(player.get("flower_labels"))
      this.props.onSubmit();
    }
  };

  showTangram = (label, location,player) => {
    return (
      <div>
        <div className="image">
          <center><img width='200px' src={location} /></center>
        </div>
        
        <div className="pt-form-group">
          <div className="pt-form-content">
            <TextArea
              id={label}
              large={true}
              intent={Intent.PRIMARY}
              onChange={this.handleChange}
              fill={true}
              name={label}
              value={player.get("flower_labels")[label]}
              key={label}
            />
          </div>
        </div>
      </div>
    )
  }
  
  componentWillMount() {}

  render() {
    const { player, game } = this.props;
    let flowers=player.get("flowers")
    //console.log(player)
    //console.log(player.get("flower_labels")["purple_5"])
    let flowerlist = (flowers.map(flower => this.showTangram(flower.label, flower.location, player)))
    return  (
      <Centered>
        <div className="post-test">
          <form onSubmit={this.handleSubmit}>
            <h3>
              Please describe these image as you would <b>for the other members of your group </b>.
            </h3>
            {flowerlist}
                    <button type="submit"  
                     className="bp3-button bp3-intent-primary"
>
                        Submit
                        <span className="pt-icon-standard pt-icon-key-enter pt-align-right" />
                    </button>
          </form>  
        </div>
      </Centered>
    );
  }
}


export class OtherColorTest extends React.Component {
  static stepName = "othercolortest"
  handleChange = (event) => {
    const { game, player } = this.props;
    const el = event.currentTarget;
    console.log(player.get("otherflower_labels"))
    console.log(el.name)
    console.log(el.value)
    let labels=player.get("otherflower_labels")
    labels[el.name] =el.value;
    player.set("otherflower_labels", labels)
  };

  handleSubmit = (event) => {
    const { player } = this.props;
    event.preventDefault();
    console.log(player)
    if (_.values(player.get("otherflower_labels")).includes("")) {
      AlertToaster.show({
        message: "Sorry, you have not completed all the questions above. Please answer the questions before submitting!"
      });
    }  else {
      console.log(player.get("otherflower_labels"))
      this.props.onSubmit();
    }
  };

  showTangram = (label, location,player) => {
    return (
      <div>
        <div className="image">
          <center><img width='200px' src={location} /></center>
        </div>
        
        <div className="pt-form-group">
          <div className="pt-form-content">
            <TextArea
              id={label}
              large={true}
              intent={Intent.PRIMARY}
              onChange={this.handleChange}
              fill={true}
              name={label}
              value={player.get("otherflower_labels")[label]}
              key={label}
            />
          </div>
        </div>
      </div>
    )
  }
  
  componentWillMount() {}

  render() {
    const { player, game } = this.props;
    let flowers=player.get("otherflowers")
    console.log(flowers)
    //console.log(player.get("flower_labels")["purple_5"])
    let flowerlist = (flowers.map(flower => this.showTangram(flower.label, flower.location, player)))
    return  (
      <Centered>
        <div className="post-test">
          <form onSubmit={this.handleSubmit}>
            <h3>
              Please describe these image as you would <b>for the other members of your group </b>.
            </h3>
            {flowerlist}
                    <button type="submit"  
                     className="bp3-button bp3-intent-primary"
>
                        Submit
                        <span className="pt-icon-standard pt-icon-key-enter pt-align-right" />
                    </button>
          </form>  
        </div>
      </Centered>
    );
  }
}
