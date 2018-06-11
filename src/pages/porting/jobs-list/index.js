import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import CardText from 'material-ui/Card/CardText';
import CardHeader from 'material-ui/Card/CardHeader';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Table from 'material-ui/Table';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableBody from 'material-ui/Table/TableBody';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import GithubUrlParser from 'parse-github-url';
import upperFirst from 'lodash/upperFirst';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import PropTypes from 'prop-types';
import {deepOrange600, lightGreen800, cyan800, yellowA700, grey50} from 'material-ui/styles/colors';
import {loadingProcessStart, loadingProcessEnd} from "../../../actions/loading";
import {loadPortingJobs, loadPortingJobArtifacts} from "../../../actions/porting";
import {download} from "../../../services/file";
import Refresher from './refresher';

class JobsList extends React.Component {
    componentDidMount() {
        this.refreshList(true)();
    }

    getStatusColor = status => {
        const colors = {
            pending: cyan800,
            done: lightGreen800,
            failed: deepOrange600,
            in_progress: yellowA700
        };

        return colors[status];
    };

    refreshList = globalLoading => () => {
        this.props.loadingProcessStart('jobs_list', globalLoading);
        this.props.loadPortingJobs()
            .then(response => this.props.loadingProcessEnd('jobs_list'));
    };

    handleArtifacts = (event, value) => {
        this.props.loadingProcessStart('load_artifacts', true);
        this.props.loadPortingJobArtifacts(value)
            .then(response => {
                download(value, response);
                this.props.loadingProcessEnd('load_artifacts');
            });
    };

    handleUpdateTime = time => {this.setState({refreshTime: time})};

    prepareUrl = url => GithubUrlParser(url).path;

    render() {
        return (
            <Card className={this.props.className}>
                <CardHeader
                    title="Activity Log"
                    actAsExpander
                    showExpandableButton
                />
                <CardText expandable>
                    <Refresher
                        onUpdateTimeChange={this.handleUpdateTime}
                        refreshList={this.refreshList(false)}
                        refreshTime={this.state ? this.state.refreshTime : null}
                    />
                    <div className="refresh-jobs-button">
                        <FlatButton
                            label="refresh"
                            primary
                            disabled={!!this.props.loading['jobs_list']}
                            onClick={this.refreshList(true)}
                        />
                    </div>
                    <div className="inline-refresh-indicator">
                        <RefreshIndicator
                            percentage={40}
                            size={30}
                            left={0}
                            top={0}
                            status={this.props.loading['jobs_list'] ? 'loading' : 'hide'}
                        />
                    </div>
                    <Table selectable={false}>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>PR link</TableHeaderColumn>
                                <TableHeaderColumn>Target Repo</TableHeaderColumn>
                                <TableHeaderColumn>Target Version</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                                <TableHeaderColumn>Artifacts</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.jobs.map( (row, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>
                                        <FlatButton
                                            className="jobs-pr-link"
                                            label={this.prepareUrl(row.pr_link)}
                                            href={row.pr_link}
                                        />
                                    </TableRowColumn>
                                    <TableRowColumn>{row.target_repo}</TableRowColumn>
                                    <TableRowColumn>{row.target_branch}</TableRowColumn>
                                    <TableRowColumn>
                                        {
                                            <Chip
                                                backgroundColor={this.getStatusColor(row.status)}
                                                labelColor={grey50}>
                                                {upperFirst(row.status.replace(/_/g, ' '))}
                                            </Chip>
                                        }
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {
                                            row.artifacts ?
                                                <div>
                                                    <IconMenu
                                                        iconButtonElement={<IconButton><FileFileDownload /></IconButton>}
                                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                        useLayerForClickAway={true}
                                                        onChange={this.handleArtifacts}
                                                    >
                                                        {
                                                            row.artifacts.patch
                                                                ? <MenuItem
                                                                    primaryText="Download Patch"
                                                                    value={row.artifacts.patch}
                                                                />
                                                                : ''
                                                        }
                                                        {
                                                            row.artifacts.error_log
                                                                ? <MenuItem
                                                                    primaryText="Download Error Logs"
                                                                    value={row.artifacts.error_log}
                                                                />
                                                                : ''
                                                        }
                                                    </IconMenu>
                                                    <RefreshIndicator
                                                        percentage={20}
                                                        size={25}
                                                        left={7}
                                                        top={-4}
                                                        //status={this.props.requestRetrieveArtifactFile ? 'loading' : 'hide'}
                                                    />
                                                </div>
                                                : 'Not available'
                                        }
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    jobs: state.porting.jobs,
    loading: state.loading
});

JobsList.propTypes = {
    loadPortingJobs: PropTypes.func.isRequired,
    loadingProcessStart: PropTypes.func.isRequired,
    loadingProcessEnd: PropTypes.func.isRequired,
    loadPortingJobArtifacts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    loadPortingJobs,
    loadingProcessStart,
    loadingProcessEnd,
    loadPortingJobArtifacts
})(JobsList);