import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import { Breadcrumb, Row, Col, Button, Tooltip, Tabs } from 'antd';
import { HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { List, Avatar } from 'antd';

const ArtistDetail = (props) => {    

    const api_key = process.env.REACT_APP_API;
    const [artist, setArtist] = useState([]);
    const [genres, setGenres] = useState([]);
    const [productions, setProductions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${props.match.params.artistID}?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            console.log(data);          
            setArtist(data);
            // setGenres(data.genres);
            // setProductions(data.production_companies);
            // setCountries(data.production_countries);
            // setLanguages(data.spoken_languages);
        })        
    }, []);    

    return (
        <div>
            <Breadcrumb style={{ padding: '16px' }}>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/artists">Уран бүтээлчид</a>
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
                                <img className="poster" src={`https://image.tmdb.org/t/p/w500${artist.profile_path}`} alt="artist-cover" />
                            </Col>
                            <Col span={24} md={16}>
                                <p className="title">{artist.name}</p>        
                                <ul className="sub-info">                                    
                                    <li>{artist.known_for_department}</li>                                    
                                </ul>
                                <Row gutter={[16, 16]}>    
                                    <Col xs={24} sm={24} md={18} lg={18}>
                                        <div className="actioncircles">
                                            <Tooltip title="Like">
                                                <Button className="action" shape="circle" icon={<HeartOutlined />} />
                                            </Tooltip>  
                                            <Tooltip title="Check">
                                                <Button className="action" shape="circle" icon={<UserAddOutlined />} />
                                            </Tooltip>      
                                        </div>                                        
                                    </Col>                                                                    
                                </Row>                                
                                <p style={{ fontSize: '14px' }}>
                                    Төрсөн өдөр: {artist.birthday}
                                </p>    
                                <p style={{ fontSize: '14px' }}>
                                    Төрсөн газар: {artist.place_of_birth}
                                </p>                                                                 
                                <p style={{ fontSize: '14px' }}> 
                                    Хандалт: {artist.popularity}
                                </p>      
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab="Танилцуулга" key="1">
                                        <h3>ТАНИЛЦУУЛГА</h3>
                                        <p>{artist.biography}</p>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Уран бүтээл" key="2">
                                        <h3>Уран бүтээл</h3>                                    
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