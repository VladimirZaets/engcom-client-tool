import { Row, Col } from 'react-flexbox-grid';
import React from 'react';
import Header from './header';
import ProgressLine from '../components/progress-line';
import MessageList from '../components/message-list';

const Layout = ({ header, children }) => (
    <div>
        <Row>
            <Col center={'xs'}>
                <MessageList/>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
                {header}
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
                <ProgressLine/>
            </Col>
        </Row>
        <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
                {children}
            </Col>
        </Row>
    </div>
);

Layout.defaultProps = {
    header: <Header />
};

export default Layout;