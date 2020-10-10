import React, { useEffect, useState } from 'react';
import './ContentDetail.css';
import { Breadcrumb, Row, Col, Button, Tooltip, Tabs, Modal, Rate } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarOutlined, ShareAltOutlined, StarFilled, PlayCircleOutlined, CreditCardOutlined, HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { List, Avatar, message } from 'antd';

import artistlist from '../artistlist.json';
import occupationlist from '../occupationlist.json';
import movielist from '../movielist.json';

const ArtistDetail = (props) => {    

    const [artist, setArtist] = useState({});
    const [occupations, setOccupations] = useState([]);
    const [movies, setMovies] = useState([]);
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
        let artist = artistlist.find((item) => parseInt(item.id) === parseInt(props.match.params.id));             
        let artistoccupations = artist.occupations.map((item) => 
            occupationlist.find((o) => parseInt(o.id) === parseInt(item))
        );
        let artistmovies = [];
        //  movielist.find((item) => item.crew.find((c) => parseInt(c.artistid) === parseInt(artist.id)));
        movielist.map((item) => {
            var res = item.crew.find((c) => 
                parseInt(c.artistid) === parseInt(artist.id)
            )
            if (res !== undefined)
            {
                artistmovies.push(item);
            }
        });
        console.log(artistmovies);
        setMovies(artistmovies);
        setOccupations(artistoccupations);
        setArtist(artist);             
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
                    <a href={`/${props.type}`}>{props.keyword}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {artist.name}
                </Breadcrumb.Item>
            </Breadcrumb> 
            <div className="main">
                <Row>
                    <Col sm={2} md={4}></Col>
                    <Col sm={20} md={16}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={8}>
                                <img className="poster" src={artist.image} alt="movie-cover" />                             
                            </Col>
                            <Col span={24} md={16}>
                                <p className="title">{artist.name}</p> 
                                <p style={{ opacity: '0.7', margin: 0 }}>
                                    {occupations.map((o) =>                       
                                        <span key={o.id}>{o.name_mn} / </span>
                                    )}  
                                </p>                                             
                                <p style={{ opacity: '0.7' }}>Төрсөн өдөр: {checkDate(artist.birthdate)}</p>                              
                                <div className="actioncircles">
                                    <Tooltip title="Таалагдсан">
                                        <Button className={buttonLike} shape="circle" icon={<HeartOutlined />} onClick={like} />
                                    </Tooltip>  
                                    <Tooltip title="Үзсэн">
                                        <Button className={buttonCheck} shape="circle" icon={<UserAddOutlined />} onClick={check} />
                                    </Tooltip>      
                                    <Tooltip title="Дараа үзэх">
                                        <Button className={buttonWatchlist} shape="circle" icon={<PlusOutlined />} onClick={watchlist} />
                                    </Tooltip>       
                                    {/* <Tooltip title="Үнэлгээ өгөх">
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
                                    </Modal>  */}
                                </div>                                                                                                                                                
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab="Танилцуулга" key="1">
                                        <h3>Танилцуулга</h3>                                                                                
                                        <p>{artist.biography}</p>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Уран бүтээлүүд" key="2">
                                        <h3>Уран бүтээлүүд</h3>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={movies}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                        title={<a href="https://ant.design">{item.title}</a>}    
                                                        description={checkDate(item.release_date)}                                                
                                                    />
                                                </List.Item>
                                            )}
                                        />
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

export default ArtistDetail;