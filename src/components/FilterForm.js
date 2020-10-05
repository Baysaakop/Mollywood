import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';
import './FilterForm.css';
import Genres from '../genres.json';

const { Option } = Select;
const { RangePicker } = DatePicker;

const FilterForm = (props) => {
    
    const api_key = process.env.REACT_APP_API;
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {            
            setGenres(data.genres);
        })
    }, []);        

    const onFinish = values => {        
        if (props.type === 'movies') {
            filterMovies(values);
        }
        else if (props.type === 'series') {
            filterSeries(values);
        }
        else if (props.type === 'artists') {
            filterArtists(values);
        }
    };

    const filterMovies = (values) => {        
        let name = checkInput(values['name']);        
        let genre = checkInput(values['genre']);                           
        let yearfrom = checkInput(values['yearfrom']);
        let yearto = checkInput(values['yearto']);
        let ratingmin = checkInput(values['ratingmin']);
        let ratingmax = checkInput(values['ratingmax']);
        let result = props.contents;        
        if (name !== '') {
            result = result.filter((content) => content.title.toLowerCase().includes(name.toLowerCase()));            
        }       
        if (genre !== '' && genre !== 0) {                 
            result = result.filter((content) => content.genre_ids.includes(genre));            
        }        
        if (yearfrom !== '') {
            var datefrom = new Date(yearfrom, 0, 1);            
            result = result.filter((content) => (new Date(content.release_date)) > datefrom);
        }
        if (yearto !== '') {
            var dateto = new Date(yearto, 11, 31);            
            result = result.filter((content) => (new Date(content.release_date)) < dateto);
        }
        if (ratingmin !== '') {                      
            result = result.filter((content) => (content.vote_average) > ratingmin);
        }
        if (ratingmax !== '') {                      
            result = result.filter((content) => (content.vote_average) < ratingmax);
        }
        props.filter(result);
    }

    const filterSeries = (values) => {        
        let name = checkInput(values['name']);        
        let genre = checkInput(values['genre']);                           
        let yearfrom = checkInput(values['yearfrom']);
        let yearto = checkInput(values['yearto']);
        let ratingmin = checkInput(values['ratingmin']);
        let ratingmax = checkInput(values['ratingmax']);
        let result = props.contents;        
        if (name !== '') {
            result = props.contents.filter((content) => content.name.toLowerCase().includes(name.toLowerCase()));            
        }       
        if (genre !== '' && genre !== 0) {                 
            result = result.filter((content) => content.genre_ids.includes(genre));            
        }        
        if (yearfrom !== '') {
            var datefrom = new Date(yearfrom, 0, 1);            
            result = result.filter((content) => (new Date(content.first_air_date)) > datefrom);
        }
        if (yearto !== '') {
            var dateto = new Date(yearto, 11, 31);            
            result = result.filter((content) => (new Date(content.first_air_date)) < dateto);
        }
        if (ratingmin !== '') {                      
            result = result.filter((content) => (content.vote_average) > ratingmin);
        }
        if (ratingmax !== '') {                      
            result = result.filter((content) => (content.vote_average) < ratingmax);
        }
        props.filter(result);
    }

    const filterArtists = (values) => {
        let name = checkInput(values['name']);
        let result = props.contents.filter((content) => content.name.toLowerCase().includes(name.toLowerCase()));
        props.filter(result);
    }

    const checkInput = (input) => {        
        if (input === undefined)
            return '';
        else 
            return input;
    }

    return (
        <div className="filter-form">
            <Form                        
                name="filter-form"                          
                layout="vertical"              
                onFinish={onFinish}                    
            >
                <h2>{props.keyword} хайх</h2>
                <Form.Item
                    name="name"                            
                    label="Нэр"          
                    className="formrow"          
                >
                    <Input placeholder="Нэр" />
                </Form.Item>
                { (props.type === 'movies' || props.type === 'series') ? (
                    <Form.Item>
                        <Form.Item name="genre" label="Төрөл жанр" className="formrow">
                            <Select
                                defaultValue={0}                                                 
                                allowClear
                            >
                                <Option key={0} value={0}>Бүх</Option>
                                {Genres.map((genre) => 
                                    <Option key={genre.id} value={genre.id}>{genre.name_mn}</Option>
                                )}
                            </Select>
                        </Form.Item> 
                        <Form.Item label="Нээлт" className="formrow">
                            <Form.Item name="yearfrom" style={{ display: 'inline-block' }}>
                                <InputNumber defaultValue={1900} min={1900} max={2020} />
                            </Form.Item>
                            <Form.Item name="yearto" style={{ display: 'inline-block', margin: '0 8px' }}>
                                <InputNumber defaultValue={2020} min={1900} max={2020} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Үнэлгээ" className="formrow">
                            <Form.Item name="ratingmin" style={{ display: 'inline-block' }}>
                                <InputNumber defaultValue={0} min={0} max={10} />
                            </Form.Item>
                            <Form.Item name="ratingmax" style={{ display: 'inline-block', margin: '0 8px' }}>
                                <InputNumber defaultValue={10} min={0} max={10} />
                            </Form.Item>
                        </Form.Item>      
                    </Form.Item> 
                ) : (
                    <Form.Item>
                        <Form.Item name="occupation" label="Мэргэжил" className="formrow">
                            <Select
                                defaultValue={0}                                                 
                                allowClear
                            >
                                <Option key={0} value={0}>Бүх</Option>
                                <Option key={1} value={1}>Жүжигчин</Option>
                                <Option key={2} value={2}>Найруулагч</Option>
                                <Option key={3} value={3}>Продюсер</Option>
                            </Select>
                        </Form.Item> 
                        <Form.Item label="Төрсөн он" className="formrow">
                            <Form.Item name="yearfrom" style={{ display: 'inline-block' }}>
                                <InputNumber defaultValue={1900} min={1900} max={2020} />
                            </Form.Item>
                            <Form.Item name="yearto" style={{ display: 'inline-block', margin: '0 8px' }}>
                                <InputNumber defaultValue={2020} min={1900} max={2020} />
                            </Form.Item>
                        </Form.Item>     
                    </Form.Item> 
                )}
                
                {/*    
                <Form.Item name="release-range-picker" label="Нээлт">
                    <RangePicker />
                </Form.Item>   
                <Form.Item label="Үнэлгээ">
                    <Form.Item name="ratingmin" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                        <InputNumber defaultValue={0} min={0} max={10} />
                    </Form.Item>
                    <Form.Item name="ratingmax" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                        <InputNumber defaultValue={10} min={0} max={10} />
                    </Form.Item>
                </Form.Item>       */}
                <Form.Item className="formrow">
                    <Button type="primary" htmlType="submit" className="search-button">
                        Хайх
                    </Button>                            
                </Form.Item>
            </Form>
        </div>
    );
}

export default FilterForm;