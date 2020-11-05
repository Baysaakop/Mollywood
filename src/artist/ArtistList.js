import React, { useState, useEffect } from 'react';
import { Breadcrumb, Col, List, Row, Select } from 'antd';
import ArtistFilterForm from './ArtistFilterForm';
import artistlist from '../data/artistlist.json';
import ArtistCard from './ArtistCard';

const { Option } = Select;

const ArtistList = (props) => {

    const api_key = process.env.REACT_APP_API;
    const [type, setType] = useState('');
    const [orderMode, setOrderMode] = useState('birthdate');
    const [allArtists, setAllArtists] = useState([]);    
    const [artists, setArtists] = useState([]);        

    useEffect(() => {                        
        setType(props.type);
        setAllArtists(orderByBirthdate(artistlist));
        setArtists(orderByBirthdate(artistlist));      
    }, []);    

    const selectOrderMode = value => {        
        setOrderMode(value);
        if (value === 'name') {
            orderByName(artists);
        }
        else if (value === 'birthdate') {
            orderByBirthdate(artists);
        }
    };

    const orderByName = (data) => {        
        return data.sort((a, b) => a.name.localeCompare(b.name));
    }

    const orderByBirthdate = (data) => {
        return data.sort((a, b) => new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime());
    }

    const filter = (result) => {    
        setArtists(result);                             
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
            <Row style={{ padding: '16px' }} className="main">                
                <Col sm={12} md={18}>
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h3>Нийт: {artists.length} {props.keyword}</h3>
                        </div>
                        <div>
                            <Select defaultValue={orderMode} style={{ width: 250 }} onChange={selectOrderMode}>   
                                <Option value="name">Үсгийн дараалал</Option>                                
                                <Option value="birthdate">Төрсөн өдөр</Option>  
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
                                    type={type}        
                                    name={item.name} 
                                    image={item.image}                                      
                                    date={getYearFromDate(item.birthdate)}
                                />                         
                            </List.Item>
                        )}
                    /> 
                </Col>
                <Col sm={24} md={6}>                    
                    <ArtistFilterForm 
                        type={type}
                        keyword={props.keyword}
                        contents={allArtists}
                        filter={filter}
                    />
                </Col>
            </Row>                          
        </div>
    );
};

export default ArtistList;