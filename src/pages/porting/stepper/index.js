import React from 'react';
import { connect } from 'react-redux';
import GithubUrlParser from "parse-github-url";
import {isEmpty, isGithubUrl} from "../../../services/validation";
import PropTypes from "prop-types";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {Step, Stepper as StepperMaterial, StepLabel, StepContent} from 'material-ui/Stepper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import StepperResult from './stepper-result';
import {setPortingSettings} from "../../../actions/porting";
import {loadBranches} from "../../../actions/branches";
import {loadingProcessStart, loadingProcessEnd} from "../../../actions/loading";

class Stepper extends React.Component {
    constructor(props) {
        super(props);

        this.pull_request_information = {};
        this.defaultState = this.state = {
            currentStep: 0,
            pull_request_link: '',
            target_branch: '',
            isStepperIsPassed: false,
            errors: {}
        }
    }

    getPortingSetting = () => {
        let settings = {
            ...this.props.portingSettings,
            base_organization: this.pull_request_information.owner,
            base_repository: this.pull_request_information.name,
            base_pull_request_number: this.pull_request_information.filepath,
            base_pull_request_link: this.state.pull_request_link
        };

        if (!this.props.portingSettings.target_repository) {
            return {
                ...settings,
                target_repository: this.pull_request_information.name
            }
        }

        return settings;
    };
    onChange = e => this.setState({[e.target.name]: e.target.value});
    onSelectChange = type => (event, index, value) => this.setState({[type]: value});
    handlePullRequestrLinkChange = event => {
        const validate = isGithubUrl(this.state.pull_request_link);

        if (validate.isValid) {
            this.pull_request_information = GithubUrlParser(this.state.pull_request_link);
            this.props.setPortingSettings(this.getPortingSetting());
            this.setState({
                errors: {...this.state.errors, pull_request_link: ''}
            });
            this.props.loadingProcessStart('load_branches', true);
            this.props.loadBranches({
                base_org: this.pull_request_information.owner,
                base_repo: this.pull_request_information.name,
                base_pr_number: this.pull_request_information.filepath,
            }).then(response => {
                this.props.loadingProcessEnd('load_branches');

                if (!response.error) {
                    this.nextStep();
                }
            });
        } else {
            this.setState({
                errors: {...this.state.errors, pull_request_link: validate.message}
            });
        }
    };
    handleTargetVersionInformation = event => {
        const validate = isEmpty(this.state.target_branch);

        if (validate.isValid) {
            this.nextStep();
            this.props.setPortingSettings({
                ...this.props.portingSettings,
                target_branch: this.state.target_branch
            });
        } else {
            this.setState({
                errors: {...this.state.errors, target_branch: validate.message}
            });
        }

    };
    nextStep = () => this.setState({currentStep: this.state.currentStep + 1});
    previousStep = () => this.setState({currentStep: this.state.currentStep - 1});
    stepperIsPassed = () => {
        this.nextStep();
        this.setState({isStepperIsPassed: true});
        this.props.onStepperIsPassed();
    };
    resetStepper = event => this.setState(this.defaultState);

    render() {
        return (
            <div>
                <StepperMaterial
                    activeStep={this.state.currentStep}
                    orientation="vertical"
                >
                    <Step>
                        <StepLabel>Select Pull Request for porting</StepLabel>
                        <StepContent>
                            <TextField
                                name='pull_request_link'
                                hintText="Place your link here"
                                value={this.state.pull_request_link}
                                errorText={this.state.errors.pull_request_link}
                                onChange={this.onChange}
                            />
                            <div className="inline-refresh-indicator stepper-refresh-indicator">
                                <RefreshIndicator
                                    percentage={40}
                                    size={30}
                                    left={0}
                                    top={0}
                                    status={this.props.loading['load_branches'] ? 'loading' : 'hide'}
                                />
                            </div>
                            <div className="stepper-button-bar">
                                <RaisedButton
                                    label="next"
                                    primary
                                    disableTouchRipple
                                    disableFocusRipple
                                    onClick={this.handlePullRequestrLinkChange}
                                    disabled={!!this.props.loading['load_branches']}
                                />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Select port target</StepLabel>
                        <StepContent>
                            <SelectField
                                name="target_branch"
                                floatingLabelText="Target version"
                                value={this.state.target_branch}
                                onChange={this.onSelectChange('target_branch')}
                                errorText={this.state.errors.target_branch}
                                disabled={!!this.props.loading['load_branches']}
                            >
                                { this.props.branches.map((branch, i) =>
                                    <MenuItem
                                        value={branch.value}
                                        primaryText={branch.name}
                                        key={i}
                                    />
                                )}
                            </SelectField>
                            <div className="stepper-button-bar">
                                <RaisedButton
                                    label="Next"
                                    disableTouchRipple
                                    disableFocusRipple
                                    primary
                                    onClick={this.handleTargetVersionInformation}
                                    disabled={!!this.props.loading['load_branches']}
                                />
                                <RaisedButton
                                    label="Back"
                                    disableTouchRipple
                                    disableFocusRipple
                                    onClick={this.previousStep}
                                    disabled={!!this.props.loading['load_branches']}
                                />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Port information</StepLabel>
                        <StepContent>
                            <div className="stepper-result-content">
                                <p>
                                    <strong>Pull Request:</strong>
                                    <span> {this.state.pull_request_link}</span>
                                </p>
                                <p>
                                    <strong>Target Repository:</strong>
                                    <span>
                                        {this.props.portingSettings.target_organization}/
                                        {this.props.portingSettings.target_repository}
                                    </span>
                                </p>
                                <p>
                                    <strong>Target Version:</strong>
                                    <span>{this.state.target_branch}</span>
                                </p>
                            </div>
                            <div className="stepper-button-bar">
                                <RaisedButton
                                    label="Create Job"
                                    disableTouchRipple
                                    disableFocusRipple
                                    primary
                                    onClick={this.stepperIsPassed}
                                    disabled={this.state.isStepperIsPassed}
                                />
                                <RaisedButton
                                    label="Back"
                                    disableTouchRipple
                                    disableFocusRipple
                                    onClick={this.previousStep}
                                />
                            </div>
                        </StepContent>
                    </Step>
                </StepperMaterial>
                {this.state.isStepperIsPassed && <StepperResult onClick={this.resetStepper}/>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    target_repository: state.porting.targetRepository,
    branches: state.branches.branches,
    userOrganizationsInformation: state.user.userOrganizationsInformation,
    portingSettings: state.porting.settings,
    loading: state.loading
});


Stepper.propTypes = {
    setPortingSettings: PropTypes.func.isRequired,
    loadBranches: PropTypes.func.isRequired,
    onStepperIsPassed: PropTypes.func.isRequired,
    loadingProcessStart: PropTypes.func.isRequired,
    loadingProcessEnd: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    loadBranches,
    setPortingSettings,
    loadingProcessStart,
    loadingProcessEnd
})(Stepper);