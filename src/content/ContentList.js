import React, { useState, useEffect } from 'react';
import '../css/ContentList.css';
import { Breadcrumb, Col, List, Radio, Row, Select, Tooltip, Space } from 'antd';
import ContentCard from './ContentCard';
import ContentFilterForm from './ContentFilterForm';
import movielist from '../data/movielist.json';
import serieslist from '../data/serieslist.json';
import { AppstoreFilled, MenuOutlined } from '@ant-design/icons';
import ContentListItem from './ContentListItem';

const { Option } = Select;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const ContentList = (props) => {

    const api_key = process.env.REACT_APP_API;
    const [type, setType] = useState('');
    const [orderMode, setOrderMode] = useState('releasedate');
    const [allContents, setAllContents] = useState([]);    
    const [contents, setContents] = useState([]);     
    const [viewMode, setViewMode] = useState('grid');

    const handleViewMode = e => {        
        setViewMode(e.target.value);
    }

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
        return data.sort((a, b) => a.name.localeCompare(b.name));
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
            <Row className="main" gutter={[16, 16]}>                
                <Col xs={24} sm={12} md={16} lg={18}>
                    <Row gutter={[8, 8]}>
                        <Col xs={24} sm={24} md={24} lg={8}>
                            <h3>Нийт: {contents.length} {props.keyword}</h3>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16} id="modeselector">                            
                            <Select defaultValue={orderMode} style={{ width: 200 }} onChange={selectOrderMode}>   
                                <Option value="title">Үсгийн дараалал</Option>
                                <Option value="rating">Үнэлгээгээр</Option>
                                <Option value="releasedate">Нээлтийн огноо</Option>  
                            </Select>
                            <Radio.Group value={viewMode} onChange={handleViewMode}>
                                <Tooltip title="Grid view">
                                    <Radio.Button value="grid"><AppstoreFilled /></Radio.Button>
                                </Tooltip>
                                <Tooltip title="List view">
                                    <Radio.Button value="list"><MenuOutlined /></Radio.Button>
                                </Tooltip>
                            </Radio.Group>
                        </Col>
                    </Row>
                    { viewMode === 'list' ? (
                        <List                            
                            itemLayout="vertical"
                            dataSource={contents}                            
                            pagination={{
                                onChange: page => {
                                    console.log(page)
                                },
                                pageSize: 10,
                            }}
                            renderItem={item => (                           
                                <List.Item style={{ paddingBottom: 0 }}>
                                    <ContentListItem 
                                        id={item.id}                            
                                        type={type}       
                                        item={item} 
                                        name={item.title} 
                                        image={item.image}   
                                        rating={item.score}
                                        date={getYearFromDate(item.release_date)}
                                    />
                                </List.Item>                                            
                            )}
                        />
                    ) : (
                        <List
                            grid={{
                                gutter: 16,
                                xs: 2,
                                sm: 2,
                                md: 2,
                                lg: 4,
                                xl: 5,
                                xxl: 8,
                            }}
                            dataSource={contents}
                            pagination={{
                                onChange: page => {
                                    console.log(page)
                                },
                                pageSize: 40,
                            }}
                            renderItem={item => (
                                <List.Item>
                                    <ContentCard                                    
                                        id={item.id}                            
                                        type={type}        
                                        name={item.name} 
                                        image={item.image}   
                                        rating={item.score}
                                        date={getYearFromDate(item.release_date)}
                                        genres={item.genres}
                                    />                         
                                </List.Item>
                            )}
                        /> 
                    )}                                       
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>                    
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