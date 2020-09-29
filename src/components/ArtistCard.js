import React from "react";
import './MovieCard.css';
import { Card, Tooltip } from 'antd';
import { HeartOutlined, UserAddOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;

const ArtistCard = (props) => {
    return (
        <div>
            <Link to={`/artists/${props.id}`}>
                <Card                      
                    hoverable                      
                    style={{ width: 'auto' }}
                    cover={<img alt="example" src={props.poster} />}
                    actions={[
                        <Tooltip title="Favorite">
                            <HeartOutlined key="love" />
                        </Tooltip>,
                        <Tooltip title="Follow">
                            <UserAddOutlined key="follow" />
                        </Tooltip>,
                        <EllipsisOutlined key="more" />,
                    ]}
                >
                    <Meta title={props.title} description={props.department} />      
                    <p>{props.popularity}</p>                                                              
                </Card>
            </Link>
        </div>
    );
};

export default ArtistCard;