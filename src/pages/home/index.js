import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import styles from '../../styles/main';
import Layout from '../../layout/index';
import { Row, Col } from 'react-flexbox-grid';

class Main extends React.Component {
    render() {
        return (
            <Layout>
                <Row style={styles.root}>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <Link to="/porting-tool" style={styles.link}>
                            <Card containerStyle={styles.card}>
                                <CardTitle
                                    title="Pull Request Porting Tool"
                                    subtitle="Tooling to automate Pull Request porting between Magento versions and repositories"
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <Link to="/deployment-tool" style={styles.link}>
                            <Card to="/reset_password">
                                <CardTitle
                                    title="Pull Request Deployment Tool"
                                    subtitle="Automation for deployment of public pull requests instances for collaborative testing"
                                />
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default Main;