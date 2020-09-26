import React, { useState, useEffect } from 'react';
import { Breadcrumb, Col, List, Row} from 'antd';
import MovieCard from '../components/MovieCard';
import './MovieList.css';
import MovieFilterForm from '../components/MovieFilterForm';

const MovieList = (props) => {

    const api_key = process.env.REACT_APP_API;
    const [movies, setMovies] = useState([]);

    const sortByDateAsc = (data) => {
        return data.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    const sortByDateDesc = (data) => {
        return data.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }

    const sortByRatingAsc = (data) => {
        return data.sort((a, b) => a.vote_average - b.vote_average);
    }

    const sortByRatingDesc = (data) => {
        return data.sort((a, b) => b.vote_average - a.vote_average);
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`)
        .then(data => data.json())
        .then(data => {
            console.log(data.results);
            setMovies(sortByDateDesc(data.results));
        })
    }, []);    

    const filter = (name, genre, releasefrom, releaseto, ratingmin, ratingmax) => {                
        if (name != '') {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${name}`)
            .then(data => data.json()
            .then(data => { 
                let filterdata = data.results.filter((movie) => (movie.release_date >= releasefrom && movie.release_date < releaseto && movie.vote_average >= ratingmin && movie.vote_average < ratingmax));
                if (filterdata != null && filterdata.length > 0)
                {
                    setMovies(filterdata);
                }     
            }));                        
        }        
        else {
            fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`)
            .then(data => data.json())
            .then(data => {
                let filterdata = data.results.filter((movie) => (movie.release_date >= releasefrom && movie.release_date < releaseto && movie.vote_average >= ratingmin && movie.vote_average < ratingmax));
                if (filterdata != null && filterdata.length > 0)
                {
                    setMovies(filterdata.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()));
                }     
            })
        }           
        // if (ratingMin) {
        //     console.log(ratingMin);
        //     setMovies(movies.filter((movie) => movie.vote_average >= ratingMin));
        // }
        // if (ratingMax) {
        //     console.log(ratingMax);
        //     setMovies(movies.filter((movie) => movie.vote_average < ratingMax));
        // }        
    };

    // const listData = [];
    // for (let i = 0; i < 23; i++) {
    //     listData.push({            
    //         title: `Movie name ${i}`,            
    //     });
    // }

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