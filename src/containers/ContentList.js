import React, { useState, useEffect } from 'react';
import { Breadcrumb, Col, List, Row, Select } from 'antd';
import ContentCard from '../components/ContentCard';

const { Option } = Select;

const ContentList = (props) => {

    const api_key = process.env.REACT_APP_API;
    const [type, setType] = useState('');
    const [contents, setContents] = useState([]);
    // const [orderMode, setOrderMode] = useState('releasedate');

    // const orderByAlphabetAsc = (data) => {
    //     return data.sort((a, b) => a.title.localeCompare(b.title));
    // }

    // const orderByAlphabetDesc = (data) => {
    //     return data.sort((a, b) => b.title.localeCompare(a.title));
    // }

    // const orderByDateAsc = (data) => {
    //     return data.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    // }

    // const orderByDateDesc = (data) => {
    //     return data.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    // }

    // const orderByRatingAsc = (data) => {
    //     return data.sort((a, b) => a.vote_average - b.vote_average);
    // }

    // const orderByRatingDesc = (data) => {
    //     return data.sort((a, b) => b.vote_average - a.vote_average);
    // }

    // const selectOrderMode = (mode) => {                     
    //     setOrderMode(mode);
    //     if (mode === 'alphabet') {
    //         setMovies(orderByAlphabetAsc(movies));
    //     }
    //     else if (mode === 'rating') {
    //         setMovies(orderByRatingDesc(movies));
    //     }
    //     else if (mode === 'releasedate') {
    //         setMovies(orderByDateDesc(movies));
    //     }        
    // }

    const getContent = (item) => {
        if (type === 'movies') {
            return (
                <ContentCard                                    
                    id={item.id}                            
                    type={type}        
                    name={item.title} 
                    image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}  
                    rating={item.vote_average}
                    date={item.release_date}
                />
            );
        }
        else if (type === 'series') {
            return (
                <ContentCard                                    
                    id={item.id}                            
                    type={type}        
                    name={item.name} 
                    image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}  
                    rating={item.vote_average}
                    date={item.first_air_date}
                />
            );
        }
        else if (type === 'artists') {
            return (
                <ContentCard                                    
                    id={item.id}                            
                    type={type}        
                    name={item.name} 
                    image={`https://image.tmdb.org/t/p/w500${item.profile_path}`}  
                    rating={item.popularity}
                    date={item.first_air_date}
                />
            );
        }
    }

    const isMovies = () => {
        if (props.link === 'movies') {
            return true;
        }
        return false;
    }

    const isSeries = () => {
        if (props.link === 'series') {
            return true;
        }
        return false;
    }

    const isArtists = () => {
        if (props.link === 'artists') {
            return true;
        }
        return false;
    }

    useEffect(() => {                
        fetch(`https://api.themoviedb.org/3/${props.type}/popular?api_key=${api_key}&language=en-US&page=1`)
        .then(data => data.json())
        .then(data => {            
            console.log(data.results);
            setContents(data.results);
            setType(props.link);                   
        })                
    }, []);    

    // const filter = (name, genre, releasefrom, releaseto, ratingmin, ratingmax) => {                
    //     if (name != '') {
    //         fetch(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${name}`)
    //         .then(data => data.json()
    //         .then(data => {                 
    //             let filterdata = data.results.filter((movie) => (movie.release_date >= releasefrom && movie.release_date < releaseto && movie.vote_average >= ratingmin && movie.vote_average < ratingmax));
    //             if (filterdata !== null && filterdata.length > 0)
    //             {                                                               
    //                 setMovies(orderByDateDesc(filterdata));                                                              
    //             }     
    //         }));                        
    //     }        
    //     else {
    //         fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`)
    //         .then(data => data.json())
    //         .then(data => {
    //             let filterdata = data.results.filter((movie) => (movie.release_date >= releasefrom && movie.release_date < releaseto && movie.vote_average >= ratingmin && movie.vote_average < ratingmax));
    //             if (filterdata !== null && filterdata.length > 0)
    //             {                                             
    //                 setMovies(orderByDateDesc(filterdata));                                  
    //             }     
    //         })
    //     }                                  
    // };

    return (
        <div>
            <Breadcrumb style={{ padding: '16px' }}>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {props.keyword}
                </Breadcrumb.Item>
            </Breadcrumb>                            
            <Row style={{ padding: '16px' }}>                
                <Col sm={12} md={18}>
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h3>Нийт: {contents.length} {props.keyword}</h3>
                        </div>
                        <div>
                            <Select defaultValue="alphabet" style={{ width: 200 }}>
                                <Option value="alphabet">Үсгийн дараалал</Option>
                                <Option value="rating">Үнэлгээгээр</Option>
                                <Option value="releasedate">Нээлтийн огноо</Option>                            
                            </Select>
                        </div>
                    </div>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 2,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 6,
                        }}
                        dataSource={contents}
                        pagination={{
                            onChange: page => {
                                console.log(page)
                            },
                            pageSize: 12,
                        }}
                        renderItem={item => (
                            <List.Item>
                                {getContent(item)}                          
                            </List.Item>
                        )}
                    /> 
                </Col>
                <Col sm={24} md={6}>                    
                    
                </Col>
            </Row>                          
        </div>
    );
};

export default ContentList;