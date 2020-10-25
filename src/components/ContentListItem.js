import React, { useState, useEffect } from "react";
import './ContentListItem.css';
import { Card, Tooltip, message, Row, Col, Image, Button, Divider, Rate, Modal } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarOutlined, ShareAltOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;

const ContentListItem = (props) => {
    const [type, setType] = useState('');
    const [buttonLike, setButtonLike] = useState('action');
    const [buttonCheck, setButtonCheck] = useState('action');
    const [buttonWatchlist, setButtonWatchlist] = useState('action');
    const [buttonRate, setButtonRate] = useState('action');
    const [rateVisible, setRateVisible] = useState(false);    
    const scoreValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const [score, setScore] = useState(0);    

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

    const rate = (value) => {
        setScore(value);
    }

    const showRateModal = () => {
        setRateVisible(true);
    }

    const hideRateModal = () => {
        setRateVisible(false);
    }

    const checkDate = (date) => {    
        let d = new Date(date);
        if (d.getMonth() === 0 && d.getDate() === 1) {
            return d.getFullYear();
        }    
        return date;
    }

    return (
        <div>
            <Row gutter={[24, 8]}>
                <Col xs={12} sm={8} md={4}>
                    <Link to={`/${type}/${props.id}`}>
                        <Image width="100%" src={props.item.image} fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==" /> 
                    </Link>
                </Col>
                <Col xs={12} sm={16} md={16}>
                    <Link to={`/${type}/${props.id}`}>
                        <h2 style={{ margin: '0' }}>{props.item.name} <span style={{ opacity: '.5', fontSize: 'large' }}>/{props.date}/</span></h2>                                        
                    </Link>
                    <p style={{ fontSize: '12px' }}>
                        Адал явдал / Гэмт хэрэг / Драм
                    </p>
                    <p className="description">
                        {props.item.description}
                    </p>
                    <Divider style={{ margin: '8px 0' }} />
                    <Row>                    
                        <Col xs={24} md={8}><StarOutlined /> Үнэлгээ: {props.rating}/10</Col>     
                        <Col xs={24} md={8}><ClockCircleOutlined /> Хугацаа: {props.item.runningtime} мин</Col>                        
                        <Col xs={24} md={8}><CalendarOutlined /> Нээлт: {checkDate(props.item.release_date)}</Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={4}>
                    <Row gutter={[16, 16]}>
                        <Col xs={6} md={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip title="Таалагдсан">
                                <Button className={buttonLike} shape="circle" icon={<LikeOutlined />} onClick={like} />
                            </Tooltip>
                        </Col>
                        <Col xs={6} md={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip title="Үзсэн">
                                <Button className={buttonCheck} shape="circle" icon={<CheckOutlined />} onClick={check} />
                            </Tooltip> 
                        </Col>
                        <Col xs={6} md={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip title="Дараа үзэх">
                                <Button className={buttonWatchlist} shape="circle" icon={<PlusOutlined />} onClick={watchlist} />
                            </Tooltip>   
                        </Col>
                        <Col xs={6} md={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip title="Үнэлгээ өгөх">
                                <Button className={buttonRate} shape="circle" icon={<StarOutlined />} onClick={showRateModal} />
                            </Tooltip> 
                            <Modal
                                title={<p>{props.item.title}-д үнэлгээ өгөх</p>}              
                                visible={rateVisible}    
                                onOk={hideRateModal}   
                                onCancel={hideRateModal}                                                        
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Rate count={10} tooltips={scoreValues} onChange={rate} />                                                                                        
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    Таны үнэлгээ: {score}
                                </div>
                            </Modal> 
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default ContentListItem;