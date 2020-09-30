import React, { useState, useEffect } from 'react';
import { Breadcrumb, Row, Col, Select, List } from 'antd';
import ArtistFilterForm from '../components/ArtistFilterForm';
import ArtistCard from '../components/ArtistCard';

const { Option } = Select;

const ArtistList = (props) => {
    const api_key = process.env.REACT_APP_API;
    const [artists, setArtists] = useState([]);
    const [orderMode, setOrderMode] = useState('releasedate');

    const orderByAlphabetAsc = (data) => {
        return data.sort((a, b) => a.name.localeCompare(b.name));
    }

    const orderByAlphabetDesc = (data) => {
        return data.sort((a, b) => b.name.localeCompare(a.name));
    }

    const orderByPopularityAsc = (data) => {
        return data.sort((a, b) => a.popularity - b.popularity);
    }

    const orderByPopularityDesc = (data) => {
        return data.sort((a, b) => b.popularity - a.popularity);
    }

    const selectOrderMode = (mode) => {                     
        setOrderMode(mode);
        if (mode === 'alphabet') {
            setArtists(orderByAlphabetAsc(artists));
        }
        else if (mode === 'popularity') {
            setArtists(orderByPopularityDesc(artists));
        }       
    }

    useEffect(() => {                
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=en-US&page=1`)
        .then(data => data.json())
        .then(data => {                        
            setArtists(orderByAlphabetAsc(data.results));     
            console.log(orderByAlphabetAsc(data.results));
        })
    }, []);    

    const filter = (name) => {                
        if (name != '') {
            fetch(`https://api.themoviedb.org/3/search/person?api_key=${api_key}&query=${name}&include_adult=false`)
            .then(data => data.json()
            .then(data => {                                 
                if (data.results !== null && data.results.length > 0)
                {                                                               
                    setArtists(orderByAlphabetAsc(data.results));            
                    console.log(orderByAlphabetAsc(data.results));                                                  
                }     
            }));                        
        }        
        // else {
        //     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
        //     .then(data => data.json())
        //     .then(data => {
        //         let filterdata = data.results.filter((movie) => (movie.release_date >= releasefrom && movie.release_date < releaseto && movie.vote_average >= ratingmin && movie.vote_average < ratingmax));
        //         if (filterdata !== null && filterdata.length > 0)
        //         {                                             
        //             setMovies(orderByDateDesc(filterdata));                                  
        //         }     
        //     })
        // }                                  
    };

    return (
        <div>            
            <Breadcrumb style={{ padding: '16px' }}>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Уран бүтээлчид
                </Breadcrumb.Item>
            </Breadcrumb>    
            <Row style={{ padding: '16px' }}>                
                <Col sm={12} md={18}>
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h3>Нийт: {artists.length} уран бүтээлч</h3>
                        </div>
                        <div>
                            <Select defaultValue="alphabet" style={{ width: 200 }} onChange={selectOrderMode}>
                                <Option value="alphabet">Үсгийн дараалал</Option>
                                <Option value="popularity">Popularity</Option>                                
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
                        dataSource={artists}
                        pagination={{
                            onChange: page => {
                                console.log(page)
                            },
                            pageSize: 12,
                        }}
                        renderItem={item => (
                            <List.Item>
                                <ArtistCard 
                                    id={item.id}
                                    title={item.name} 
                                    poster={`https://image.tmdb.org/t/p/w500${item.profile_path}`}  
                                    department={item.known_for_department}
                                    popularity={item.popularity}                                    
                                />
                            </List.Item>
                        )}
                    /> 
                </Col>
                <Col sm={24} md={6}>                    
                    <ArtistFilterForm filter={filter} />
                </Col>
            </Row>             
        </div>
    );
};

export default ArtistList;