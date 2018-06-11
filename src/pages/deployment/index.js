import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import './index.css';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import Layout from '../../layout';
import Header from '../../layout/header';
import headerStyle from '../../styles/header';
import deploymentStyle from '../../styles/deployment';
import {pullRequestDeploy} from '../../actions/deployment';
import {loadPullRequestList, openPullRequest} from '../../actions/pull-requests';

class DeploymentTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            filteredList: [],
            filterField: ''
        };
    }

    componentWillMount() {
        this.props.loadPullRequestList()
            .then(() => {
                this.redirectPullRequest();
                this.setFilteredList(null, '');
            });
    };

    redirectPullRequest = () => {
        const redirectNumber = localStorage.getItem('redirectPrAfterLogin');
        let pr;

        if (!redirectNumber) {
            return;
        }

        pr = this.props.pullRequestList.find(item => item.number.toString() === redirectNumber);

        if (pr) {
            localStorage.removeItem('redirectPrAfterLogin');
            this.openPullRequest(pr);
        }
    };

    isPRListLoaded = () => this.props.prListLoading ? (
        <TableRow>
            <TableRowColumn colSpan={3}>
                <div style={headerStyle.container}>
                    <RefreshIndicator
                        size={50}
                        left={0}
                        top={0}
                        loadingColor="#FF9800"
                        status="loading"
                        style={headerStyle.refresh}
                    />
                </div>
            </TableRowColumn>
        </TableRow>
    ) : '';

    handleDeploy = data => this.props.pullRequestDeploy(data)
        .then(response => loadPullRequestList());

    getStatusButton = (data) => {
        if (!data.deployment) {
            return <RaisedButton label="Deploy" onClick={() => this.props.pullRequestDeploy(data)}/>
        } else if (data.deployment && data.deployment.status === 'created') {
            return <RaisedButton label="Pending..." disabled={true}/>
        } else if (data.deployment && data.deployment.status === 'success') {
            return <RaisedButton label="Open" primary onClick={() => this.props.openPullRequest(data)}/>
        }
    };

    getPRList = () => this.state.filteredList.map((item, i) => (
        <TableRow key={i}>
            <TableRowColumn width={'25%'}>
                <a href={item.pull_request.html_url} target='_blank'>
                    {item.repo_owner}/{item.repo_name}#{item.number}
                </a>
            </TableRowColumn>
            <TableRowColumn width={'65%'}>{item.title}</TableRowColumn>
            <TableRowColumn width={'10%'}>{this.getStatusButton(item)}</TableRowColumn>
        </TableRow>
    ));

    refreshPrList = () => {
        this.props.loadPullRequestList()
            .then(() => this.setFilteredList());
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});
    handleFilterChange = (event, value) => {
        console.log(event, value);
        this.onChange(event);
        this.setFilteredList(value);
    };
    setFilteredList = value => {
        const val = typeof value === 'string' ? value : this.state.filterField;
        const filteredList = this.props.pullRequestList.filter(pullrequest => {
            let numberMatch = pullrequest.number.toString().indexOf(val) > -1,
                descriptionMatch = pullrequest.title.indexOf(val) > -1;

            return numberMatch || descriptionMatch;
        });

        this.setState({filteredList})
    };

    render() {
        return (
            <Layout header={
                <Header
                    iconElementLeft="cloud"
                    tool="deployment"
                />
            }>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Toolbar>
                            <ToolbarGroup style={deploymentStyle.filterField}>
                                <TextField
                                    name="filterField"
                                    style={deploymentStyle.filterField}
                                    hintText="Filter"
                                    onChange={this.handleFilterChange}
                                    disabled={this.props.prListLoading}
                                    value={this.state.filterField}
                                />
                            </ToolbarGroup>
                        </Toolbar>
                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn width={'25%'}>PR</TableHeaderColumn>
                                    <TableHeaderColumn width={'65%'}>Title</TableHeaderColumn>
                                    <TableHeaderColumn width={'10%'}>Status</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {this.isPRListLoaded()}
                                {this.getPRList()}
                            </TableBody>
                        </Table>
                        <div className="refreshButton"
                            onClick={this.refreshPrList}
                        >
                            <RefreshIndicator
                                percentage={99}
                                size={60}
                                status="ready"
                                color="rgb(239, 108, 0)"
                                top={0}
                                left={0}
                                style={{
                                    position: 'relative',
                                    opacity: '0.5'
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        pullRequestList: state.pullRequests.pullRequestList
    }
};

DeploymentTool.propTypes = {
    loadPullRequestList: PropTypes.func.isRequired,
    openPullRequest: PropTypes.func.isRequired,
    pullRequestDeploy: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    loadPullRequestList,
    openPullRequest,
    pullRequestDeploy
})(DeploymentTool);