import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';
import './FilterForm.css';
import genrelist from '../genrelist.json';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ContentFilterForm = (props) => {
    
    const api_key = process.env.REACT_APP_API;
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
        // .then(data => data.json())
        // .then(data => {            
        //     setGenres(data.genres);
        // })
        setGenres(genrelist);
    }, []);        

    const onFinish = values => {       
        let name = checkInput(values['name']);        
        let genre = checkInput(values['genre']);                           
        let yearfrom = checkInput(values['yearfrom']);
        let yearto = checkInput(values['yearto']);
        let ratingmin = checkInput(values['ratingmin']);
        let ratingmax = checkInput(values['ratingmax']);
        let result = props.contents;        
        if (name !== '') {
            result = result.filter((content) => content.name.toLowerCase().includes(name.toLowerCase()));            
        }       
        if (genre !== '' && genre !== 0) {                 
            result = result.filter((content) => content.genres.includes(genre));            
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
            result = result.filter((content) => (content.score) > ratingmin);
        }
        if (ratingmax !== '') {                      
            result = result.filter((content) => (content.score) < ratingmax);
        }
        props.filter(result); 
    };

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
                    <Form.Item>
                        <Form.Item name="genre" label="Төрөл жанр" className="formrow">
                            <Select
                                defaultValue={0}                                                 
                                allowClear
                            >
                                <Option key={0} value={0}>Бүх</Option>
                                {genres.map((genre) => 
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
                <Form.Item className="formrow">
                    <Button type="primary" htmlType="submit" className="search-button">
                        Хайх
                    </Button>                            
                </Form.Item>
            </Form>
        </div>
    );
}

export default ContentFilterForm;