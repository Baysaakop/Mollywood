import React, { useState, useEffect } from "react";
import './ContentCard.css';
import { Card, Tooltip } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;

const ContentCard = (props) => {
    const [type, setType] = useState('');

    useEffect(() => {                
        setType(props.type);
    }, []);

    return (
        <div>
            <Link to={`/${type}/${props.id}`}>
                <Card                      
                    hoverable                      
                    style={{ width: 'auto' }}
                    cover={<img alt="example" src={props.image} />}
                    actions={[
                        <Tooltip title="Таалагдсан">
                            <LikeOutlined key="like" />
                        </Tooltip>,
                        <Tooltip title="Үзсэн">
                            <CheckOutlined key="check" />
                        </Tooltip>,
                        <Tooltip title="Дараа үзэх">
                            <PlusOutlined key="add" />
                        </Tooltip>,
                    ]}
                >
                    <Meta title={props.name} description={props.date} />                                
                    <div style={{ marginTop: '5px' }}>                    
                        <span><StarFilled style={{ color: '#AAF50A', fontSize: '18px' }} /> {props.rating}/10</span>                        
                    </div>                                    
                </Card>
            </Link>
        </div>
    );
};

export default ContentCard;