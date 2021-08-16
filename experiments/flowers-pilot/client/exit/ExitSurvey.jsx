import React from "react";

import { Centered } from "meteor/empirica:core";


import {
    Button,
    Classes,
    FormGroup,
    RadioGroup,
    TextArea,
    Intent,
    Radio,
    Checkbox,
} from "@blueprintjs/core";

export default class ExitSurvey extends React.Component {
    static stepName = "ExitSurvey";
    state = {
        age: "",
        gender: "",
        language: "",
        raceWhite: "",
        raceBlack: "",
        raceAsian: "",
        raceNative: "",
        raceIslander: "",
        raceHispanic: "",
        education: "",
        correctness: "",
        human: "",
        workedWell: "",
        fair: "",
        chatUseful: "",
        feedback: "",
        time: "",
        player1:"",
        player2:"",
        p1nice:"",
        p2nice:"",
        p1again:"",
        p2again:""
    };

    handleChange = (event) => {
        const el = event.currentTarget;
        this.setState({ [el.name]: el.value });
        console.log(el.name)
    };

    handleEnabledChange = (event) => {
        const el = event.currentTarget;
        this.setState({ [el.name]: !this.state[el.name] });
        console.log(el.name)
      };
    handleSubmit = (event) => {
      event.preventDefault();
      console.log(this.state);
        this.props.onSubmit(this.state);
    };


    exitForm = (p1,p2) => {
        const {
            age,
            gender,
            language,
            raceWhite,
            raceBlack,
            raceAsian,
            raceNative,
            raceIslander,
            raceHispanic,
            education,
            correctness,
            human,
            workedWell,
            fair,
            chatUseful,
            feedback,
            time,
            player1,
            player2,
            p1nice,
            p2nice,
            p1again,
            p2again,
        } = this.state;
        let hownicep1="How nice was "+p1+" ?"
        let hownicep2="How nice was "+p2+" ?"
        let wantagainp1="How much would you want to be paired with "+p1+" again if you played another round?"
        let wantagainp2="How much would you want to be paired with "+p2+" again if you played another round?"
        return (
            <div>
              {" "}
              <h1>
                Finally, please answer the following short survey. 
              </h1>
              <h3>
                You do not have to provide any information you feel uncomfortable with. 
              </h3>
              <h3>
                  Your compensation does NOT depend on these answers.
                </h3>
              <form onSubmit={this.handleSubmit}>
                    <span> </span>
                    <div className="form-line">
              <div>
                <label htmlFor="age">Age</label>
                <div>
                  <input
                    id="age"
                    type="number"
                    min="0"
                    max="150"
                    step="1"
                    dir="auto"
                    name="age"
                    value={age}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
                </div>
                <div className="form-line">
              <div>
                <label htmlFor="gender">Gender</label>
                <div>
                  <input
                    id="gender"
                    type="text"
                    dir="auto"
                    name="gender"
                    value={gender}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="form-line">
            <div>
                <label htmlFor="language">Native Language</label>
                <div>
                  <input
                    id="language"
                    type="text"
                    dir="auto"
                    name="language"
                    value={language}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          
            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="race">
                Which races/ethnicities do you identify with? Select all that apply. 
              </label>
              <div className="bp3-form-content ">
                <div className="bp3-control bp3-checkbox ">
                  <Checkbox
                    name={"raceWhite"}
                    label="White"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox ">
                  <Checkbox
                    name={"raceBlack"}
                    label="Black or African American"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"raceNative"}
                    label="Native American or Alaska Native"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"raceAsian"}
                    label="Asian"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"raceIslander"}
                    label="Native Hawaiian or other Pacific Islander"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"raceHispanic"}
                    label="Hispanic or Latino"
                    onChange={this.handleEnabledChange}
                  />
                </div>
              </div>
            </div>


            <div>
            <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="education"
                                label="What's your highest level of education?"
                                onChange={this.handleChange}
                                selectedValue={education}
                                onChange={this.handleChange}
                            >
              <Radio
                  value="lessHighSchool"
                  label="Less than High School"
                />
                <Radio
                  value="highSchool"
                  label="High School"
                />
                <Radio
                  value="someCollege"
                  label="Some College"
                />
                <Radio
                  value="bachelor"
                  label="US Bachelor's Degree"
                />
                <Radio
                  value="master"
                  label="Master's or higher"
                />
                </RadioGroup>
            </div>
            </div>
                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="correctness"
                                label="Did you read the instructions and think you did the tasks correctly?"
                                onChange={this.handleChange}
                                selectedValue={correctness}
                            >
                                <Radio
                                    label="Yes"
                                    value="yes"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="No, I was confused"
                                    value="no"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>


                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="human"
                                label="Did you believe that you were playing with real human partners?"
                                onChange={this.handleChange}
                                selectedValue={human}
                            >
                                <Radio
                                    label="Yes, my partners were real participants."
                                    value="yes"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="No, my partners were secretly computers."
                                    value="no"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="workedWell"
                                label="Do you think you and your partners worked well together?"
                                onChange={this.handleChange}
                                selectedValue={workedWell}
                            >
                                <Radio
                                    label="Strongly agree"
                                    value="stronglyAgree"
                                    className={"pt-inline"}
                                />
                                <Radio label="Agree" value="agree" className={"pt-inline"} />
                                <Radio
                                    label="Neutral"
                                    value="neutral"
                                    className={"pt-inline"}
                                />

                                <Radio
                                    label="Disagree"
                                    value="disagree"
                                    className={"pt-inline"}
                                />

                                <Radio
                                    label="Strongly disagree"
                                    value="stronglyDisagree"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="p1nice"
                                label={hownicep1}
                                onChange={this.handleChange}
                                selectedValue={p1nice}
                            >
                                <Radio label="Not nice at all" value="1" className={"pt-inline"}/>
                                <Radio label="" value="2" className={"pt-inline"}/>
                                <Radio label="" value="3" className={"pt-inline"}/>
                                <Radio label="" value="4" className={"pt-inline"}/>
                                <Radio label="" value="5" className={"pt-inline"}/>
                                <Radio label="" value="6" className={"pt-inline"}/>
                                <Radio label="Very nice" value="7" className={"pt-inline"}/>
 
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="p2nice"
                                label={hownicep2}
                                onChange={this.handleChange}
                                selectedValue={p2nice}
                            >
                                <Radio label="Not nice at all" value="1" className={"pt-inline"}/>
                                <Radio label="" value="2" className={"pt-inline"}/>
                                <Radio label="" value="3" className={"pt-inline"}/>
                                <Radio label="" value="4" className={"pt-inline"}/>
                                <Radio label="" value="5" className={"pt-inline"}/>
                                <Radio label="" value="6" className={"pt-inline"}/>
                                <Radio label="Very nice" value="7" className={"pt-inline"}/>
 
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="p1again"
                                label={wantagainp1}
                                onChange={this.handleChange}
                                selectedValue={p1again}
                            >
                                <Radio label="Would NOT want to be paired" value="1" className={"pt-inline"}/>
                                <Radio label="" value="2" className={"pt-inline"}/>
                                <Radio label="" value="3" className={"pt-inline"}/>
                                <Radio label="" value="4" className={"pt-inline"}/>
                                <Radio label="" value="5" className={"pt-inline"}/>
                                <Radio label="" value="6" className={"pt-inline"}/>
                                <Radio label="Would want to be paired" value="7" className={"pt-inline"}/>
 
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="p2again"
                                label={wantagainp2}
                                onChange={this.handleChange}
                                selectedValue={p2again}
                            >
                                <Radio label="Would NOT want to be paired" value="1" className={"pt-inline"}/>
                                <Radio label="" value="2" className={"pt-inline"}/>
                                <Radio label="" value="3" className={"pt-inline"}/>
                                <Radio label="" value="4" className={"pt-inline"}/>
                                <Radio label="" value="5" className={"pt-inline"}/>
                                <Radio label="" value="6" className={"pt-inline"}/>
                                <Radio label="Would want to be paired" value="7" className={"pt-inline"}/>
 
                            </RadioGroup>
                        </div>
                    </div>


                    <div className="form-line thirds">

                        <FormGroup
                            className={"form-group"}
                            inline={false}
                            label={"Do you feel the pay was fair?"}
                            labelFor={"fair"}
                            //className={"form-group"}
                        >
                            <TextArea
                                id="fair"
                                name="fair"
                                large={true}
                                intent={Intent.PRIMARY}
                                onChange={this.handleChange}
                                value={fair}
                                fill={true}
                            />
                        </FormGroup>
                    </div>
                    <div className="form-line thirds">

<FormGroup
    className={"form-group"}
    inline={false}
    label={"Was the in-game chat feature easy to use?"}
    labelFor={"chatUseful"}
    //className={"form-group"}
>
    <TextArea
        id="chatUseful"
        name="chatUseful"
        large={true}
        intent={Intent.PRIMARY}
        onChange={this.handleChange}
        value={chatUseful}
        fill={true}
    />
</FormGroup>
</div>

<div className="form-line thirds">

<FormGroup
    className={"form-group"}
    inline={false}
    label={"Did you feel like you had enough time on each round?"}
    labelFor={"time"}
    //className={"form-group"}
>
    <TextArea
        id="time"
        name="time"
        large={true}
        intent={Intent.PRIMARY}
        onChange={this.handleChange}
        value={time}
        fill={true}
    />
</FormGroup>
</div>


                  <div className="form-line thirds">
                    <FormGroup
                      className={"form-group"}
                      inline={false}
                      label={"Did you notice any problems or have any other comments about the study?"}
                      labelFor={"feedback"}
                      //className={"form-group"}
                    >
                    <TextArea
                      id="feedback"
                      name="feedback"
                      large={true}
                      intent={Intent.PRIMARY}
                      onChange={this.handleChange}
                      value={feedback}
                      fill={true}
                    />
                                      
                    </FormGroup>
                    </div>
                    
                    </div>
                    <button type="submit"  
                     className="bp3-button bp3-intent-primary"
>
                        Submit
                        <span className="pt-icon-standard pt-icon-key-enter pt-align-right" />
                    </button>
                </form>{" "}
            </div>
        );
    };

    componentWillMount() {}

    render() {
      const { player, game } = this.props;
      let p1=player.get("p1")
      let p2=player.get("p2")
        return (
            <Centered>
                <div className="exit-survey">
                    {this.exitForm(p1,p2)}
                </div>
            </Centered>
        );
    }
}
