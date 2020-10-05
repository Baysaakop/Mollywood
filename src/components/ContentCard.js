import React, { useState, useEffect } from "react";
import './ContentCard.css';
import { Card, Tooltip } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarFilled, HeartOutlined, UserAddOutlined, EllipsisOutlined } from '@ant-design/icons';
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
                            <LikeOutlined key="favorite" />
                        </Tooltip>,
                        <Tooltip title="Үзсэн">
                            <CheckOutlined key="check" />
                        </Tooltip>,
                        <Tooltip title="Дараа үзэх">
                            <PlusOutlined key="add" />
                        </Tooltip>
                        // (type === 'movies' || type === 'series') ? (
                        // [
                        //         <Tooltip title="Таалагдсан">
                        //             <LikeOutlined key="favorite" />
                        //         </Tooltip>,
                        //         <Tooltip title="Үзсэн">
                        //             <CheckOutlined key="check" />
                        //         </Tooltip>,
                        //         <Tooltip title="Дараа үзэх">
                        //             <PlusOutlined key="add" />
                        //         </Tooltip>                                        
                        // ]) : ([
                        //     <Tooltip title="Таалагдсан">
                        //         <HeartOutlined key="favorite" />
                        //     </Tooltip>,
                        //     <Tooltip title="Дагах">
                        //         <UserAddOutlined key="follow" />
                        //     </Tooltip>,
                        //     <Tooltip title="Дараа үзэх">
                        //         <EllipsisOutlined key="more" />
                        //     </Tooltip>
                        // ])
                    ]}
                >
                    <Tooltip title={props.name}>
                        <Meta title={props.name} description={props.date} /> 
                    </Tooltip>                               
                    <div style={{ marginTop: '5px', fontSize: '14px' }}>                    
                        <span><StarFilled style={{ color: '#AAF50A', fontSize: '18px' }} /> {props.rating}/10</span>                        
                    </div>                                    
                </Card>
            </Link>
        </div>
    );
};

export default ContentCard;