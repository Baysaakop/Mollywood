import React from 'react';
import { Breadcrumb, Row, Col, List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, ShareAltOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const BlogList = (props) => {
    return (
        <div>
            <Breadcrumb style={{ padding: '16px' }}>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Блог жагсаалт
                </Breadcrumb.Item>
            </Breadcrumb>      
            <Row style={{ padding: '16px' }}>                
                <Col sm={12} md={18}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 6,
                        }}
                        dataSource={listData}                        
                        renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[                                
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="12" key="list-vertical-message" />,
                                <IconText icon={ShareAltOutlined} text="39" key="list-vertical-share" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}                            
                        />
                        {item.content}
                        </List.Item>
                        )}
                    /> 
                </Col>
                <Col sm={24} md={6}>                                        
                </Col>
            </Row>  
        </div>
    );    
};

export default BlogList;