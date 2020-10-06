import React, { useEffect, useState } from 'react';
import './ContentDetail.css';
import { Breadcrumb, Row, Col, Button, Tooltip, Tabs, Modal, Rate } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarOutlined, ShareAltOutlined, StarFilled, PlayCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import { List, Avatar, message } from 'antd';

import movielist from '../movielist.json';
import genrelist from '../genrelist.json';
import artistlist from '../artistlist.json';
import occupationlist from '../occupationlist.json';

const ContentDetail = (props) => {    

    const api_key = process.env.REACT_APP_API;
    const [content, setContent] = useState({});
    const [genres, setGenres] = useState([]);
    const [crew, setCrew] = useState([]);
    const [cast, setCast] = useState([]);
    const [buttonLike, setButtonLike] = useState('action');
    const [buttonCheck, setButtonCheck] = useState('action');
    const [buttonWatchlist, setButtonWatchlist] = useState('action');
    const [buttonRate, setButtonRate] = useState('action');
    const [buttonShare, setButtonShare] = useState('action');
    const [rateVisible, setRateVisible] = useState(false);    
    const scoreValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const [score, setScore] = useState(0);    


    const showRateModal = () => {
        setRateVisible(true);
    }

    const hideRateModal = () => {
        setRateVisible(false);
    }

    useEffect(() => {
        // fetch(`https://api.themoviedb.org/3/${props.type}/${props.match.params.movieID}?api_key=${api_key}&language=en-US`)
        // .then(data => data.json())
        // .then(data => {
        //     console.log(data);          
        //     setContent(data);
        //     setGenres(data.genres);
        //     setProductions(data.production_companies);
        //     setCountries(data.production_countries);
        //     setLanguages(data.spoken_languages);
        // })      
        let movie = movielist.find((item) => parseInt(item.id) === parseInt(props.match.params.id));     
        let moviegenres = movie.genres.map((item) => 
            genrelist.find((g) => parseInt(g.id) === parseInt(item))
        );
        let moviecrew = movie.crew.map((item) => 
            artistlist.find((a) => parseInt(a.id) === parseInt(item.artistid))
        );
        let moviecast = movie.cast.map((item) => 
            artistlist.find((a) => parseInt(a.id) === parseInt(item.artistid))
        );
        setCrew(moviecrew)
        setCast(moviecast);
        setGenres(moviegenres);
        setContent(movie);             
    }, []);    

    const checkDate = (date) => {    
        let d = new Date(date);
        if (d.getMonth() === 0 && d.getDate() === 1) {
            return d.getFullYear();
        }    
        return date;
    }

    const like = () => {
        if (buttonLike === 'action') {
            setButtonLike('actionChecked');
        }
        else {
            setButtonLike('action');
        }
        message.success('Таалагдсан киноны жагсаалтанд нэмэгдлээ.');
    };

    const check = () => {
        if (buttonCheck === 'action') {
            setButtonCheck('actionChecked');
        }
        else {
            setButtonCheck('action');
        }
        message.success('Үзсэн киноны жагсаалтанд нэмэгдлээ.');
    };

    const watchlist = () => {
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

    return (
        <div>
            <Breadcrumb style={{ padding: '16px' }}>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href={`/${props.link}`}>{props.keyword}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {content.title}
                </Breadcrumb.Item>
            </Breadcrumb> 
            <div className="main">
                <Row>
                    <Col sm={2} md={4}></Col>
                    <Col sm={20} md={16}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={8}>
                                <img className="poster" src={content.image} alt="movie-cover" />
                                <div style={{ padding: '16px', border: '1px solid #f0f2f5' }}>
                                    <Button block type="primary" icon={<PlayCircleOutlined />} style={{ marginBottom: '8px' }}>Трейлер үзэх</Button>                                      
                                    {/* <Button block danger type="primary" icon={<CreditCardOutlined />}>Тасалбар захиалах</Button>   */}
                                </div>                                
                            </Col>
                            <Col span={24} md={16}>
                                <p className="title">{content.title}</p> 
                                <p style={{ opacity: '0.7', margin: 0 }}>
                                    {genres.map((g) =>                       
                                        <span key={g.id}>{g.name_mn} / </span>
                                    )}  
                                </p>       
                                <ul className="sub-info">                                        
                                    <li>PG-13</li>
                                    <li>{content.runningtime} минут</li>
                                    <li>{checkDate(content.release_date)}</li>
                                </ul>                                
                                <div className="actioncircles">
                                    <Tooltip title="Таалагдсан">
                                        <Button className={buttonLike} shape="circle" icon={<LikeOutlined />} onClick={like} />
                                    </Tooltip>  
                                    <Tooltip title="Үзсэн">
                                        <Button className={buttonCheck} shape="circle" icon={<CheckOutlined />} onClick={check} />
                                    </Tooltip>      
                                    <Tooltip title="Дараа үзэх">
                                        <Button className={buttonWatchlist} shape="circle" icon={<PlusOutlined />} onClick={watchlist} />
                                    </Tooltip>       
                                    <Tooltip title="Үнэлгээ өгөх">
                                        <Button className={buttonRate} shape="circle" icon={<StarOutlined />} onClick={showRateModal} />
                                    </Tooltip>  
                                    <Tooltip title="Хуваалцах">
                                        <Button className={buttonShare} shape="circle" icon={<ShareAltOutlined />} />
                                    </Tooltip>
                                    <Modal
                                        title="Үнэлгээ өгөх"              
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
                                </div>                                                                                                                                                
                                <p>
                                    <StarFilled style={{ fontSize: '24px', color: '#AAF50A' }} />     
                                    <span style={{ fontSize: '18px' }}> 
                                        {content.score}/
                                        <span style={{ fontSize: '14px', opacity: .8 }}>10</span>
                                    </span>    
                                    <span style={{ fontSize: '14px', marginLeft: '16px' }}>
                                        (Нийт 200 үнэлгээ)
                                    </span>
                                </p>             
                                {/* <p>
                                    Продакшн: {productions.map((prod) => 
                                                <span key={prod.id}>{prod.name} | </span>
                                            )}                                       
                                </p> */}
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab="Мэдээлэл" key="1">
                                        <h3>Танилцуулга</h3>                                                                                
                                        <p>{content.description}</p>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Бүрэлдэхүүн" key="2">
                                        <h3>Бүрэлдэхүүн</h3>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={crew}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.image} />}
                                                        title={<a href={`/artists/${item.id}`}>{item.name}</a>} 
                                                        description={content.crew.find((c) => parseInt(c.artistid) === parseInt(item.id)).role}                                                   
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Жүжигчид" key="3">
                                        <h3>Дүрүүдэд</h3>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={cast}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.image} />}
                                                        title={<a href={`/artists/${item.id}`}>{item.name}</a>}        
                                                        description={content.cast.find((c) => parseInt(c.artistid) === parseInt(item.id)).role}                                                                                                
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Сэтгэгдэл" key="4">
                                        Сэтгэгдэл
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Зураг" key="5">
                                        Зураг
                                    </Tabs.TabPane>
                                </Tabs>                                 
                            </Col>                                                        
                        </Row>                                                                      
                    </Col>
                    <Col sm={2} md={4}></Col>
                </Row>            
            </div>
        </div>
    );
};

export default ContentDetail;