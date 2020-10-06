import React, { useState, useEffect } from 'react';
import { Breadcrumb, Col, List, Row, Select } from 'antd';
import ContentCard from '../components/ContentCard';
import ContentFilterForm from '../components/ContentFilterForm';
import movielist from '../movielist.json';
import serieslist from '../serieslist.json';

const { Option } = Select;

const ContentList = (props) => {

    const api_key = process.env.REACT_APP_API;
    const [type, setType] = useState('');
    const [orderMode, setOrderMode] = useState('releasedate');
    const [allContents, setAllContents] = useState([]);    
    const [contents, setContents] = useState([]);        

    useEffect(() => {                        
        setType(props.type); 
        if (props.type === 'movies') {
            setAllContents(orderByReleaseDate(movielist));
            setContents(orderByReleaseDate(movielist));
        }
        else if (props.type === 'series') {
            setAllContents(orderByReleaseDate(serieslist));
            setContents(orderByReleaseDate(serieslist));
        }
        // fetch(`https://api.themoviedb.org/3/${props.type}/popular?api_key=${api_key}&language=en-US&page=1`)
        // .then(data => data.json())
        // .then(data => {            
        //     console.log(data.results);
        //     setAllContents(data.results.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime()));
        //     setContents(data.results.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime()));
        //     setType(props.link);                   
        // })                
    }, []);    

    const selectOrderMode = value => {        
        setOrderMode(value);
        if (value === 'title') {
            orderByTitle(contents);
        }
        else if (value === 'rating') {
            orderByScore(contents);
        }
        else if (value === 'releasedate') {
            orderByReleaseDate(contents);
        }
    };

    const orderByTitle = (data) => {        
        return data.sort((a, b) => a.title.localeCompare(b.title));
    }

    const orderByReleaseDate = (data) => {
        return data.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }

    const orderByScore = (data) => {        
        return data.sort((a, b) => b.score - a.score);
    }    

    const filter = (result) => {    
        setContents(result);                             
    };

    const getYearFromDate = (date) => {
        return date.slice(0, 4);
    }

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
                            <Select defaultValue={orderMode} style={{ width: 250 }} onChange={selectOrderMode}>   
                                <Option value="title">Үсгийн дараалал</Option>
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
                                <ContentCard                                    
                                    id={item.id}                            
                                    type={type}        
                                    name={item.title} 
                                    image={item.image}  
                                    rating={item.score}
                                    date={getYearFromDate(item.release_date)}
                                />                         
                            </List.Item>
                        )}
                    /> 
                </Col>
                <Col sm={24} md={6}>                    
                    <ContentFilterForm 
                        type={type}
                        keyword={props.keyword}
                        contents={allContents}
                        filter={filter}
                    />
                </Col>
            </Row>                          
        </div>
    );
};

export default ContentList;