import React, { useState, useEffect } from "react";
import './ContentCard.css';
import { Card, Tooltip, message } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarFilled, HeartOutlined, UserAddOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;

const ArtistCard = (props) => {
    const [type, setType] = useState('');
    const [buttonLike, setButtonLike] = useState('action');
    const [buttonFollow, setButtonFollow] = useState('action');
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

    const follow = (e) => {
        e.preventDefault();
        if (buttonFollow === 'action') {
            setButtonFollow('actionChecked');
        }
        else {
            setButtonFollow('action');
        }
        message.success('Үзсэн киноны жагсаалтанд нэмэгдлээ.');
    };

    return (
        <div>
            <Link to={`/${type}/${props.id}`}>
                <Card        
                    hoverable                      
                    style={{ width: 'auto' }}
                    cover={                        
                        <img alt="example" src={props.image} />
                    }
                    actions={[
                        <Tooltip title="Таалагдсан">
                            <HeartOutlined key="favorite" className={buttonLike} onClick={like} />
                        </Tooltip>,
                        <Tooltip title="Дагах">
                            <UserAddOutlined key="check" className={buttonFollow} onClick={follow} />
                        </Tooltip>,
                        <Tooltip title="Дараа үзэх">
                            <PlusOutlined key="add" className={buttonWatchlist} />
                        </Tooltip>
                    ]}
                >
                    <Tooltip title={props.name}>
                        <Meta title={props.name} description={props.date} /> 
                    </Tooltip>                                                                                      
                </Card>          
            </Link>  
        </div>
    );
};

export default ArtistCard;