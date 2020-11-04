import React from 'react';
import '../css/CustomLayout.css';
import { Layout } from 'antd';
import CustomMenu from '../components/CustomMenu';
import { auth } from '../firebase/firebase.utils';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });            
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '64px', padding: '0px' }}>              
                    <CustomMenu currentUser={this.state.currentUser} />
                </Header>
                <Content className="site-layout">
                    <div className="site-layout-background" style={{ margin: '16px 0', minHeight: 380 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Mollywood ©2020 Created by On Plus</Footer>
            </Layout>
        )
    }
};

export default CustomLayout;