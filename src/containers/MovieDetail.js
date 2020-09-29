import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import { Breadcrumb, Row, Col, Button, Tooltip, Tabs } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { List, Avatar } from 'antd';

const MovieDetail = (props) => {    

    const api_key = process.env.REACT_APP_API;
    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [productions, setProductions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.match.params.movieID}?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            console.log(data);          
            setMovie(data);
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
                    <a href="/movies">Кино жагсаалт</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {movie.title}
                </Breadcrumb.Item>
            </Breadcrumb> 
            <div className="main">
                <Row>
                    <Col sm={2} md={4}></Col>
                    <Col sm={20} md={16}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={8}>
                                <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie-cover" />
                            </Col>
                            <Col span={24} md={16}>
                                <p className="title">{movie.title}</p>        
                                <ul className="sub-info">
                                    <li>PG-13</li>
                                    <li>{movie.runtime} минут</li>
                                    <li>                                    
                                        {genres.map((genre) => 
                                            <span key={genre.id}>{genre.name} </span>
                                        )}                                
                                    </li>
                                    <li>{movie.release_date}</li>
                                </ul>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={24} md={6} lg={6}>
                                        <Button type="primary">Трейлер үзэх</Button>  
                                    </Col>       
                                    <Col xs={24} sm={24} md={18} lg={18}>
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
                                        </div>                                        
                                    </Col>                                                                    
                                </Row>                                
                                <p>
                                    <StarFilled style={{ fontSize: '24px', color: '#AAF50A' }} />     
                                    <span style={{ fontSize: '18px' }}> 
                                        {movie.vote_average}/
                                        <span style={{ fontSize: '14px', opacity: .8 }}>10</span>
                                    </span>    
                                    <span style={{ fontSize: '14px', marginLeft: '16px' }}>
                                        (Нийт {movie.vote_count} үнэлгээ)
                                    </span>
                                </p>             
                                <p>
                                    Продакшн: {productions.map((prod) => 
                                                <span key={prod.id}>{prod.name} | </span>
                                            )}                                       
                                </p>
                                {/* <p>
                                    Продюсер: James Cameron
                                </p>
                                <p>
                                    Найруулагч: James Cameron
                                </p>
                                <p>
                                    Нээлтийн огноо: {movie.release_date}
                                </p>
                                <p>
                                    Улс: {countries.map((country) => 
                                        <span key={country.id}>{country.name}, </span>
                                    )}
                                </p>
                                <p>
                                    Хэл: {languages.map((language) => 
                                        <span key={language.id}>{language.name} </span>
                                    )}
                                </p> */}                                
                            </Col>      
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="Ерөнхий мэдээлэл" key="1">
                                    <h3>ТАНИЛЦУУЛГА</h3>
                                    <p>{movie.overview}</p>
                                    <h3>АГУУЛГА</h3>
                                    <p>{movie.overview}</p>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Баг бүрэлдэхүүн" key="2">
                                    <h3>Баг бүрэлдэхүүн</h3>
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
                                <Tabs.TabPane tab="Шүүмж сэтгэгдэл" key="4">
                                    Review
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Зураг трейлер" key="5">
                                    Зураг
                                </Tabs.TabPane>
                            </Tabs>                        
                        </Row>                                                                      
                    </Col>
                    <Col sm={2} md={4}></Col>
                </Row>

                {/* <img className="backdrop" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie-cover" /> */}                
            </div>
        </div>
    );
};

export default MovieDetail;