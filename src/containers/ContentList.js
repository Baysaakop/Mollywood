import React, { useState, useEffect } from 'react';
import { Breadcrumb, Col, List, Row, Select } from 'antd';
import ContentCard from '../components/ContentCard';
import FilterForm from '../components/FilterForm';
import OrderForm from '../components/OrderForm';
import movielist from '../movielist.json';

const { Option } = Select;

const ContentList = (props) => {

    const api_key = process.env.REACT_APP_API;
    const [type, setType] = useState('');
    const [allContents, setAllContents] = useState([]);    
    const [contents, setContents] = useState([]);        

    useEffect(() => {                
        setAllContents(movielist);
        setContents(movielist);
        setType(props.link); 
        // fetch(`https://api.themoviedb.org/3/${props.type}/popular?api_key=${api_key}&language=en-US&page=1`)
        // .then(data => data.json())
        // .then(data => {            
        //     console.log(data.results);
        //     setAllContents(data.results.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime()));
        //     setContents(data.results.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime()));
        //     setType(props.link);                   
        // })                
    }, []);    

    const getContent = (item) => {
        if (type === 'movies') {
            return (
                <ContentCard                                    
                    id={item.id}                            
                    type={type}        
                    name={item.name} 
                    image={item.image}  
                    rating={item.score}
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

    const filter = (result) => {    
        setContents(result);                             
    };
 
    const order = (result) => {                
        setContents(result);        
    };

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
                            <OrderForm
                                type={type}
                                keyword={props.keyword}
                                contents={contents}
                                order={order}
                            />
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
                    <FilterForm 
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