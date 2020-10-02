import React, { useEffect, useState } from 'react';
import './ContentDetail.css';
import { Breadcrumb, Row, Col, Button, Tooltip, Tabs } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarOutlined, ShareAltOutlined, StarFilled, PlayCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import { List, Avatar } from 'antd';

const ContentDetail = (props) => {    

    const api_key = process.env.REACT_APP_API;
    const [content, setContent] = useState([]);
    const [genres, setGenres] = useState([]);
    const [productions, setProductions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${props.type}/${props.match.params.movieID}?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            console.log(data);          
            setContent(data);
            setGenres(data.genres);
            setProductions(data.production_companies);
            setCountries(data.production_countries);
            setLanguages(data.spoken_languages);
        })        
    }, []);    

    const actorsdata = [
        {
            title: 'Christian Bale',
        },
        {
            title: 'Anne Hatheway',
        },
        {
            title: 'Andrew Garfield',
        },
        {
            title: 'Emma Stone',
        },        
    ];

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
                                <img className="poster" src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} alt="movie-cover" />
                                <div style={{ padding: '16px', border: '1px solid #f0f2f5' }}>
                                    <Button block type="primary" icon={<PlayCircleOutlined />} style={{ marginBottom: '8px' }}>Трейлер үзэх</Button>                                      
                                    <Button block danger type="primary" icon={<CreditCardOutlined />}>Тасалбар захиалах</Button>  
                                </div>                                
                            </Col>
                            <Col span={24} md={16}>
                                <p className="title">{content.title}</p>        
                                <ul className="sub-info">
                                    <li>PG-13</li>
                                    <li>{content.runtime} минут</li>
                                    <li>                                    
                                        {genres.map((genre) => 
                                            <span key={genre.id}>{genre.name} </span>
                                        )}                                
                                    </li>
                                    <li>{content.release_date}</li>
                                </ul>                                
                                <div className="actioncircles">
                                    <Tooltip title="Like">
                                        <Button className="action" shape="circle" icon={<LikeOutlined />} />
                                    </Tooltip>  
                                    <Tooltip title="Check">
                                        <Button className="action" shape="circle" icon={<CheckOutlined />} />
                                    </Tooltip>      
                                    <Tooltip title="Watch Later">
                                        <Button className="action" shape="circle" icon={<PlusOutlined />} />
                                    </Tooltip>       
                                    <Tooltip title="Rate">
                                        <Button className="action" shape="circle" icon={<StarOutlined />} />
                                    </Tooltip>  
                                    <Tooltip title="Share">
                                        <Button className="action" shape="circle" icon={<ShareAltOutlined />} />
                                    </Tooltip>   
                                </div>                                                                                                                                                
                                <p>
                                    <StarFilled style={{ fontSize: '24px', color: '#AAF50A' }} />     
                                    <span style={{ fontSize: '18px' }}> 
                                        {content.vote_average}/
                                        <span style={{ fontSize: '14px', opacity: .8 }}>10</span>
                                    </span>    
                                    <span style={{ fontSize: '14px', marginLeft: '16px' }}>
                                        (Нийт {content.vote_count} үнэлгээ)
                                    </span>
                                </p>             
                                <p>
                                    Продакшн: {productions.map((prod) => 
                                                <span key={prod.id}>{prod.name} | </span>
                                            )}                                       
                                </p>
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab="Мэдээлэл" key="1">
                                        <h3>Танилцуулга</h3>                                        
                                        <h3>Агуулга</h3>
                                        <p>{content.overview}</p>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Бүрэлдэхүүн" key="2">
                                        <h3>Бүрэлдэхүүн</h3>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={actorsdata}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                        title={<a href="https://ant.design">{item.title}</a>}                                                    
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Жүжигчид" key="3">
                                        <h3>Гол дүрд</h3>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={actorsdata}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                        title={<a href="https://ant.design">{item.title}</a>}                                                    
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Сэтгэгдэл" key="4">
                                        Review
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