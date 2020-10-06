import React, { useState, useEffect } from "react";
import './ContentCard.css';
import { Card, Tooltip, message } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarFilled, HeartOutlined, UserAddOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;

const ContentCard = (props) => {
    const [type, setType] = useState('');
    const [buttonLike, setButtonLike] = useState('action');
    const [buttonCheck, setButtonCheck] = useState('action');
    const [buttonWatchlist, setButtonWatchlist] = useState('action');

    useEffect(() => {                
        setType(props.type);
    }, []);

    const like = (e) => {
        e.preventDefault();
        if (buttonLike === 'action') {
            setButtonLike('actionChecked');
        }
        else {
            setButtonLike('action');
        }
        message.success('Таалагдсан киноны жагсаалтанд нэмэгдлээ.');
    };

    const check = (e) => {
        e.preventDefault();
        if (buttonCheck === 'action') {
            setButtonCheck('actionChecked');
        }
        else {
            setButtonCheck('action');
        }
        message.success('Үзсэн киноны жагсаалтанд нэмэгдлээ.');
    };

    const watchlist = (e) => {
        e.preventDefault();
        if (buttonWatchlist === 'action') {
            setButtonWatchlist('actionChecked');
        }
        else {
            setButtonWatchlist('action');
        }
        message.success('Үзэх киноны жагсаалтанд нэмэгдлээ.');
    };

    return (
        <div>
            <Link to={`/${type}/${props.id}`}>
                <Card        
                    className="content"
                    hoverable                      
                    style={{ width: 'auto' }}
                    cover={                        
                        <img alt="example" src={props.image} />
                    }
                    actions={[
                        <Tooltip title="Таалагдсан">
                            <LikeOutlined key="favorite" className={buttonLike} onClick={like} />
                        </Tooltip>,
                        <Tooltip title="Үзсэн">
                            <CheckOutlined key="check" className={buttonCheck} onClick={check} />
                        </Tooltip>,
                        <Tooltip title="Дараа үзэх">
                            <PlusOutlined key="add" className={buttonWatchlist} onClick={watchlist} />
                        </Tooltip>
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