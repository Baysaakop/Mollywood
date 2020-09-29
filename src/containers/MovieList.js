import React, { useState, useEffect } from 'react';
import { Breadcrumb, Col, List, Row, Select } from 'antd';
import MovieCard from '../components/MovieCard';
import './MovieList.css';
import MovieFilterForm from '../components/MovieFilterForm';

const { Option } = Select;

const MovieList = (props) => {

    const api_key = process.env.REACT_APP_API;
    const [movies, setMovies] = useState([]);
    const [orderMode, setOrderMode] = useState('releasedate');

    const orderByAlphabetAsc = (data) => {
        return data.sort((a, b) => a.title.localeCompare(b.title));
    }

    const orderByAlphabetDesc = (data) => {
        return data.sort((a, b) => b.title.localeCompare(a.title));
    }

    const orderByDateAsc = (data) => {
        return data.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    const orderByDateDesc = (data) => {
        return data.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }

    const orderByRatingAsc = (data) => {
        return data.sort((a, b) => a.vote_average - b.vote_average);
    }

    const orderByRatingDesc = (data) => {
        return data.sort((a, b) => b.vote_average - a.vote_average);
    }

    const selectOrderMode = (mode) => {                     
        setOrderMode(mode);
        if (mode === 'alphabet') {
            setMovies(orderByAlphabetAsc(movies));
        }
        else if (mode === 'rating') {
            setMovies(orderByRatingDesc(movies));
        }
        else if (mode === 'releasedate') {
            setMovies(orderByDateDesc(movies));
        }        
    }

    useEffect(() => {        
        setOrderMode('releasedate');
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
        .then(data => data.json())
        .then(data => {            
            console.log(data.results);
            setMovies(data.results);       
        })
    }, []);    

    const filter = (name, genre, releasefrom, releaseto, ratingmin, ratingmax) => {                
        if (name != '') {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${name}`)
            .then(data => data.json()
            .then(data => {                 
                let filterdata = data.results.filter((movie) => (movie.release_date >= releasefrom && movie.release_date < releaseto && movie.vote_average >= ratingmin && movie.vote_average < ratingmax));
                if (filterdata !== null && filterdata.length > 0)
                {                                                               
                    setMovies(orderByDateDesc(filterdata));                                                              
                }     
            }));                        
        }        
        else {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
            .then(data => data.json())
            .then(data => {
                let filterdata = data.results.filter((movie) => (movie.release_date >= releasefrom && movie.release_date < releaseto && movie.vote_average >= ratingmin && movie.vote_average < ratingmax));
                if (filterdata !== null && filterdata.length > 0)
                {                                             
                    setMovies(orderByDateDesc(filterdata));                                  
                }     
            })
        }                                  
    };

    return (
        <div>
            <Breadcrumb style={{ padding: '16px' }}>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Кино жагсаалт
                </Breadcrumb.Item>
            </Breadcrumb>                            
            <Row style={{ padding: '16px' }}>                
                <Col sm={12} md={18}>
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h3>Нийт: {movies.length} кино</h3>
                        </div>
                        <div>
                            <Select defaultValue={orderMode} style={{ width: 200 }} onChange={selectOrderMode}>
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
                        dataSource={movies}
                        pagination={{
                            onChange: page => {
                                console.log(page)
                            },
                            pageSize: 12,
                        }}
                        renderItem={item => (
                            <List.Item>
                                <MovieCard 
                                    id={item.id}
                                    title={item.title} 
                                    poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}  
                                    rating={item.vote_average}
                                    releasedate={item.release_date}
                                />
                            </List.Item>
                        )}
                    /> 
                </Col>
                <Col sm={24} md={6}>                    
                    <MovieFilterForm filter={filter} />
                </Col>
            </Row>                          
        </div>
    );
};

export default MovieList;