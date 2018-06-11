import React from 'react';
import headerStyle from "../../styles/header";

const Title = ({tool, tools}) => (
    tool ?
        (<span>
            <span>{tools[tool].name}</span>
            <span style={headerStyle.titleInner}/>
        </span>) :
        'Community Engineering Tools'
);

export default Title;