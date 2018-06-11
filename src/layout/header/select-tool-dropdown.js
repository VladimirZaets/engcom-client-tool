import React from 'react';
import { Link } from 'react-router-dom';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import without from 'lodash/without'

const SelectToolDropdown = ({toolsList, open, anchorEl, onRequestClose, toolData}) => (
    <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={onRequestClose}
        animation={PopoverAnimationVertical}
    >
        <Menu>
            {
                without(toolsList, toolData).map((tool, i) => (
                    <Link to={`/${tool.route}`} key={i}><MenuItem primaryText={tool.name}/></Link>
                ))
            }

        </Menu>
    </Popover>
);

export default SelectToolDropdown;