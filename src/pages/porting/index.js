import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import Layout from '../../layout/index';
import Header from '../../layout/header';
import { portPullRequest, updatePortingJobs } from '../../actions/porting';
import { addFlashMessage } from '../../actions/messages';
import SettingDialog from './setting-dialog';
import Stepper from './stepper';
import JobsList from './jobs-list';
import './index.css';
import { toast } from 'react-toastify';

class PortignTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogOpen: false,
            errors: {}
        }

    }

    toogleDialog = () => this.setState({isDialogOpen: !this.state.isDialogOpen});
    createPoringJob = () => this.props.portPullRequest({
        target: {
            org: this.props.portingSettings.target_organization,
            repo: this.props.portingSettings.target_repository,
            branch: this.props.portingSettings.target_branch,
        },
        base: {
            org: this.props.portingSettings.base_organization,
            repo: this.props.portingSettings.base_repository,
            pr_number: this.props.portingSettings.base_pull_request_number
        },
        useFork: this.props.portingSettings.useFork,
        strategy: this.props.portingSettings.strategy
    }).then(response => {
        this.props.updatePortingJobs({
            pr_link: this.props.portingSettings.base_pull_request_link,
            status: 'pending',
            target_repo: this.props.portingSettings.target_repository,
            target_branch: this.props.portingSettings.target_branch
        });
        this.props.addFlashMessage({
            type: 'success',
            content: response
        });
        this.props.addFlashMessage({
            type: 'error',
            content: 'vova'
        });
    });

    render() {
        return (
            <Layout header={
                <Header
                    tool="porting"
                />
            }>
                <Row className="main-container">
                    <Col xs={11} sm={11} md={11} lg={11} className="stepper-container">
                        <Stepper
                            onStepperIsPassed={this.createPoringJob}
                        />
                        <SettingDialog
                            isDialogOpen={this.state.isDialogOpen}
                            toogleDialog={this.toogleDialog}
                        />
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <IconButton
                            className="porting-configuration-button"
                            tooltip="Advanced Settings"
                            onClick={this.toogleDialog}>
                            <ActionSettings />
                        </IconButton>
                    </Col>
                </Row>
                <Row className="porting-jobs-container">
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <JobsList className="jobs-list"/>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    portingSettings: state.porting.settings,
    isAuthorized: state.authorization.isAuthorized
});

PortignTool.propTypes = {
    portPullRequest: PropTypes.func.isRequired,
    updatePortingJobs: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    portPullRequest,
    updatePortingJobs,
    addFlashMessage
})(PortignTool);