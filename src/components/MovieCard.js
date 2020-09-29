import React from "react";
import './MovieCard.css';
import { Card, Tooltip } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;

const MovieCard = (props) => {
    return (
        <div>
            <Link to={`/movies/${props.id}`}>
                <Card                      
                    hoverable                      
                    style={{ width: 'auto' }}
                    cover={<img alt="example" src={props.poster} />}
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
                    <Meta title={props.title} description={props.releasedate} />                                
                    <div style={{ marginTop: '5px' }}>                    
                        <span><StarFilled style={{ color: '#AAF50A', fontSize: '18px' }} /> {props.rating}/10</span>
                    </div>                                    
                </Card>
            </Link>
        </div>
    );
};

export default MovieCard;