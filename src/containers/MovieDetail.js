import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import { Breadcrumb, Row, Col, Button, Tooltip } from 'antd';
import { LikeOutlined, CheckOutlined, PlusOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { List } from 'antd/lib/form/Form';

const MovieDetail = (props) => {    

    const api_key = process.env.REACT_APP_API;
    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [productions, setProductions] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.match.params.movieID}?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            console.log(data);          
            setMovie(data);
            setGenres(data.genres);
            setProductions(data.production_companies);
        })        
    }, []);    

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
                                    <Col xs={24} md={6}>
                                        <Button type="primary">Трейлер үзэх</Button>  
                                    </Col>                  
                                    <Col xs={4} md={2}>
                                        <Tooltip title="Like">
                                            <Button className="action" shape="circle" icon={<LikeOutlined />} />
                                        </Tooltip>         
                                    </Col >  
                                    <Col xs={4} md={2}>
                                        <Tooltip title="Check">
                                            <Button className="action" shape="circle" icon={<CheckOutlined />} />
                                        </Tooltip>         
                                    </Col>  
                                    <Col xs={4} md={2}>
                                        <Tooltip title="Watch Later">
                                            <Button className="action" shape="circle" icon={<PlusOutlined />} />
                                        </Tooltip>         
                                    </Col>  
                                    <Col xs={4} md={2}>
                                        <Tooltip title="Rate">
                                            <Button className="action" shape="circle" icon={<StarOutlined />} />
                                        </Tooltip>         
                                    </Col>                                                           
                                </Row>                                
                                <p>
                                    <StarFilled style={{ fontSize: '24px', color: '#AAF50A' }} />     
                                    <span style={{ fontSize: '18px' }}> 
                                        {movie.vote_average}/
                                        <span style={{ fontSize: '14px', opacity: .8 }}>10</span>
                                    </span>    
                                    <span style={{ fontSize: '14px', marginLeft: '16px' }}>
                                        Нийт {movie.vote_count} үнэлгээ
                                    </span>
                                </p>             
                                <p>
                                    Продакшн: {productions.map((prod) => 
                                                <span key={prod.id}>{prod.name} | </span>
                                            )}                                       
                                </p>
                                <p>
                                    Найруулагч: James Cameron
                                </p>
                            </Col>
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