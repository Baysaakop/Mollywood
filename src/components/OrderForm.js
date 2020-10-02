import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const OrderForm = (props) => {
    
    const api_key = process.env.REACT_APP_API;
    const [orderMode, setOrderMode] = useState('releasedate');

    const selectOrderMode = value => {        
        setOrderMode(value);
        if (props.type === 'movies') {
            orderMovies(value);
        }
        else if (props.type === 'series') {
            orderSeries(value);
        }
        else if (props.type === 'artists') {
            orderArtists(value);
        }
    };    

    const orderMovies = (value) => {            
        let result = props.contents;        
        if (value === 'alphabet') {      
            result = orderByTitle(result);
        }
        else if (value === 'rating') {            
            result = orderByVoteAverage(result);
        }
        else if (value === 'releasedate') {            
            result = orderByReleaseDate(result);
        }
        props.order(result);
    }

    const orderSeries = (value) => {
        let result = props.contents;        
        if (value === 'alphabet') {                  
            result = orderByName(result);
        }
        else if (value === 'rating') {            
            result = orderByVoteAverage(result);
        }
        else if (value === 'releasedate') {            
            result = orderByFirstAirDate(result);
        }
        props.order(result);
    }

    const orderArtists = (value) => {
        let result = props.contents;        
        if (value === 'alphabet') {                  
            result = orderByName(result);
        }
        else if (value === 'rating') {            
            result = orderByPopularity(result);
        }
        props.order(result);
    }

    const orderByTitle = (data) => {        
        return data.sort((a, b) => a.title.localeCompare(b.title));
    }

    const orderByReleaseDate = (data) => {
        return data.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    const orderByName = (data) => {        
        return data.sort((a, b) => a.name.localeCompare(b.name));
    }

    const orderByFirstAirDate = (data) => {
        return data.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime());
    }

    const orderByVoteAverage = (data) => {
        return data.sort((a, b) => b.vote_average - a.vote_average);
    }

    const orderByPopularity = (data) => {
        return data.sort((a, b) => a.popularity - b.popularity);
    }

    return (
        <div>            
            { (props.type === 'movies' || props.type === 'series') ? (
                <Select defaultValue={orderMode} style={{ width: 250 }} onChange={selectOrderMode}>   
                    <Option value="alphabet">Үсгийн дараалал</Option>
                    <Option value="rating">Үнэлгээгээр</Option>
                    <Option value="releasedate">Нээлтийн огноо</Option>  
                </Select>
            ) : (props.type === 'artists') ? (
                <Select defaultValue={orderMode} style={{ width: 250 }} onChange={selectOrderMode}>   
                    <Option value="alphabet">Үсгийн дараалал</Option>
                    <Option value="rating">Үнэлгээгээр</Option>                    
                </Select>
            ) : (
                <div></div>
            )}                                      
        </div>
    );
}

export default OrderForm;