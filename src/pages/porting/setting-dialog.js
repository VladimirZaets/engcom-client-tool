import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import RadioButton from 'material-ui/RadioButton/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import ListItem from 'material-ui/List/ListItem';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import _isObject from 'lodash/isObject';
import { Row, Col } from 'react-flexbox-grid';
import {loadingProcessStart, loadingProcessEnd} from "../../actions/loading";
import {setPortingSettings} from '../../actions/porting';
import {loadUserOrganizationsInfo} from '../../actions/user';

class SettingDialog extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            useFork: true,
            strategy: 'am',
            target_organization: '',
            target_repository: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.userOrganizationsInformation.length) {
            this.setTargetOrganization(this.props.userOrganizationsInformation);
        } else {
            this.props.loadingProcessStart('load_organizations');
            this.props.loadUserOrganizationsInfo()
                .then(response => {
                    this.props.loadingProcessEnd('load_organizations');
                    this.setTargetOrganization(response);
                    this.setPortingSettings();
                });
        }
    }

    onChange = (e, value) => this.setState({[e.target.name]: value});
    onSelectChange = type => (event, index, value) => this.setState({[type]: value});
    setPortingSettings = () => {
        let object = {
            ...this.props.portingSettings,
            useFork: this.state.useFork,
            strategy: this.state.strategy,
            target_organization: this.state.target_organization
        };

        if (this.state.target_repository) {
            Object.assign(object, {target_repository: this.state.target_repository});
        }

        this.props.setPortingSettings(object);

    };

    onDialogClose = e => {
        this.props.toogleDialog();
        this.setPortingSettings()
    };
    getRepositoryByOrganizationName = name => {
        let organization = _find(this.props.userOrganizationsInformation, { name });

        return _isObject(organization) && organization.repos ? organization.repos : [];
    };
    setTargetOrganization = organizations => {
        const organization = _find(organizations, {role: 'owner'});

        this.setState({target_organization: organization ? organization.name : ''});
    };

    render () {
        return (
            <Dialog
                title={this.props.title}
                actions={[
                    <FlatButton
                        label={this.props.closeButtonLabel}
                        onClick={this.onDialogClose}
                        primary
                    />
                ]}
                modal
                open={this.props.isDialogOpen}
                autoScrollBodyContent
            >
                <Row xs={12}>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div>
                            <Subheader>{this.props.container01.title}</Subheader>
                            <ListItem
                                className="use-fork-checkbox"
                                primaryText={this.props.container01.checkboxLabel}
                                leftCheckbox={
                                    <Checkbox
                                        name="useFork"
                                        onCheck={this.onChange}
                                        checked={this.state.useFork}
                                    />
                                }
                            />
                            <Subheader>{this.props.container02.title}</Subheader>
                            <div className="porting-strategy-radio-container">
                            <RadioButtonGroup
                                name="strategy"
                                onChange={this.onChange}
                                valueSelected={this.state.strategy}
                            >
                                <RadioButton
                                    className="porting-strategy-radio-button"
                                    value="am"
                                    label={this.props.container02.radioButtonLabel01}
                                />
                                <RadioButton
                                    className="porting-strategy-radio-button"
                                    value="apply"
                                    label={this.props.container02.radioButtonLabel02}
                                />
                            </RadioButtonGroup>
                            {
                                this.state.strategy === 'apply' &&
                                <span>{this.props.container02.patchApplyMessage}</span>
                            }
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div>
                            <Subheader>
                                {this.props.container03.title}
                                <span className="porting-sub-title"> ({this.props.container03.subTitle })</span>
                            </Subheader>
                            <div className="porting-select-container">
                                <div className="porting-organization-indicator">
                                    <SelectField
                                        floatingLabelText={this.props.container03.selectLabel01}
                                        value={this.state.target_organization}
                                        onChange={this.onSelectChange('target_organization')}
                                        disabled={this.state.useFork}
                                        errorText={this.state.errors.target_organization}
                                    >
                                        {this.props.userOrganizationsInformation.map((item, i) =>
                                            <MenuItem value={item.name} primaryText={item.name} key={i}/>
                                        )}
                                    </SelectField>
                                    <RefreshIndicator
                                        percentage={40}
                                        size={30}
                                        left={270}
                                        top={35}
                                        status={this.props.loading['load_organizations'] ? 'loading' : 'hide'}
                                    />
                                </div>
                                <SelectField
                                    floatingLabelText={this.props.container03.selectLabel02}
                                    value={this.state.target_repository}
                                    onChange={this.onSelectChange('target_repository')}
                                    errorText={this.state.errors.target_repository}
                                    disabled={!this.state.target_organization}
                                >
                                    { this.getRepositoryByOrganizationName(this.state.target_organization)
                                        .map((value, i) => <MenuItem value={value} primaryText={value} key={i}/>
                                    )}
                                </SelectField>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Checkbox
                        name="useDefault"
                        onCheck={this.onChange}
                        checked={this.state.useDefault}
                    />
                </Row>
            </Dialog>
        );
    }
}

SettingDialog.propTypes = {
    setPortingSettings: PropTypes.func.isRequired,
    toogleDialog: PropTypes.func.isRequired,
    loadUserOrganizationsInfo: PropTypes.func.isRequired,
    userOrganizationsInformation: PropTypes.array.isRequired,
};

SettingDialog.defaultProps = {
    title: 'Settings',
    container01: {
        title: 'Porting options',
        checkboxLabel: 'Use my fork as target'
    },
    container02: {
        title: 'Porting strategy',
        radioButtonLabel01: 'git am (recommended)',
        radioButtonLabel02: 'git apply',
        patchApplyMessage: 'Be sure that all files from patch applied correctly.'
    },
    container03: {
        title: 'Target options',
        subTitle: 'new PR will be created here',
        selectLabel01: 'Organization',
        selectLabel02: 'Repository'
    },
    closeButtonLabel: 'Close',
    isDialogOpen: false
};

const mapStateToProps = state => ({
    userOrganizationsInformation: state.user.userOrganizationsInformation,
    portingSettings: state.porting.settings,
    loading: state.loading
});

export default connect(mapStateToProps, {
    setPortingSettings,
    loadUserOrganizationsInfo,
    loadingProcessStart,
    loadingProcessEnd,
})(SettingDialog);
