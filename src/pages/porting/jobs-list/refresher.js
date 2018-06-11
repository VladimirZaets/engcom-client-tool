import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import { loadPortingJobs } from "../../../actions/porting";

class Refresher extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.state = {
            refreshTime: props.refreshTime || -1,
        };
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleRefreshTimeChange = (event, key, value) => {
        this.onSelectChange('refreshTime')(event, key, value);
        clearInterval(this.timer);

        if (this.props.onUpdateTimeChange) {
            this.props.onUpdateTimeChange(value);
        }

        if (value !== -1) {
            this.timer = window.setInterval(this.props.refreshList, value);
        }
    };

    onSelectChange = type => (event, index, value) => this.setState({[type]: value});

    render() {
        return (
            <SelectField
                floatingLabelText="Auto Update"
                value={this.state.refreshTime}
                onChange={this.handleRefreshTimeChange}
            >
                <MenuItem value={-1} primaryText="Off" />
                <MenuItem value={10000} primaryText="10 seconds" />
                <MenuItem value={30000} primaryText="30 seconds" />
                <MenuItem value={60000} primaryText="1 minute" />
                <MenuItem value={300000} primaryText="5 minutes" />
            </SelectField>
        )
    }
}

const mapStateToProps = state => ({
});

Refresher.propTypes = {
    loadPortingJobs: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    loadPortingJobs
})(Refresher);