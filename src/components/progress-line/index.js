import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import {connect} from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import './index.css';

class ProgressLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: 0,
            show: false
        };
    }

    componentDidMount() {
        this.loading();
    }

    componentDidUpdate() {
        this.loading();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    loading = () => {
        if (this.showLoader()) {
            this.setState({show: true});
            this.timer = setTimeout(() => this.progress(10), 100);
        }
    };

    hasGlobal = () => !!_filter(this.props.loading, value => value.global).length;

    showLoader = () => !_isEmpty(this.props.loading) && !this.state.show && this.hasGlobal();

    progress(completed) {
        if (_isEmpty(this.props.loading)) {
            this.setState({completed: 100});
            setTimeout(() => this.setState({show: false}), 100);
            return;
        } else if (completed > 100 && !_isEmpty(this.props.loading) && this.hasGlobal()) {
            completed = 0;
            this.setState({completed: completed});
        } else {
            this.setState({completed});
        }

        this.timer = setTimeout(() => this.progress(completed + (window.Math.random() * 10)), 100);
    }

    render() {
        return (
            <div className="progress-line">
                {this.state.show && <LinearProgress mode="determinate" value={this.state.completed}/>}
            </div>
        )
    }

}

const mapStateToProps = state => ({
    loading: state.loading
});

export default connect(mapStateToProps, {})(ProgressLine);