import React from "react";
import './MovieCard.css';
import { Card } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';

const { Meta } = Card;

const MovieCard = (props) => {
    return (
        <div>
            <Card                      
                hoverable                      
                style={{ width: 'auto' }}
                cover={<img alt="example" src={props.poster} />}
                actions={[
                    <LikeOutlined key="like" />,
                    <CheckOutlined key="check" />,
                    <PlusOutlined key="add" />,
                ]}
            >
                <Meta title={props.title} description={props.releasedate} />                                
                <div style={{ marginTop: '5px' }}>                    
                    <span><StarFilled style={{ color: '#AAF50A', fontSize: '18px' }} /> {props.rating}/10</span>
                </div>                                    
            </Card>
        </div>
    );
};

export default MovieCard;