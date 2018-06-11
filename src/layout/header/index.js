import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import values from 'lodash/values';
import { connect } from 'react-redux';

import SelectToolDropdown from './select-tool-dropdown';
import headerStyle from '../../styles/header';
import Title from './title';
import AuthorizationBar from './authorization-bar';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
        };
    }

    handleTitleClick = (event) => {
        event.preventDefault();

        this.setState({
            dropdownOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            dropdownOpen: false,
        });
    };

    render() {
        const {
            children,
            iconElementLeft,
            iconElementRight,
            tools,
            tool
        } = this.props;
        const toolsList = values(tools);
        const titleStyle = tool ? headerStyle.title : {};

        return (
            <AppBar
                title={<Title tool={tool} tools={tools}/>}
                titleStyle={titleStyle}
                onTitleClick={this.handleTitleClick}
                iconElementLeft={<IconButton iconClassName="material-icons md48">{iconElementLeft}</IconButton>}
                iconElementRight={<AuthorizationBar/>}
            >
                {toolsList.length ?
                    <SelectToolDropdown
                        toolsList={toolsList}
                        anchorEl={this.state.anchorEl}
                        toolData={tools[tool]}
                        onRequestClose={this.handleRequestClose}
                        open={this.state.dropdownOpen}
                    /> : null
                }
                {children}
            </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return {
        tools: state.tools.tools || {},
    }
};

Header.defaultProps = {
    iconElementLeft: 'device_hub',
    iconElementRight: 'Sing In'
};

export default connect(mapStateToProps, {})(Header);