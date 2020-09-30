import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';

import './MovieFilterForm.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const MovieFilterForm = (props) => {

    const api_key = process.env.REACT_APP_API;
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            console.log(data.genres);
            setGenres(data.genres);
        })
    }, []);    

    const onFinish = values => {        
        let name = checkInput(values['name']);           
        // let genre = checkInput(values['genre']);        
        // let rangeValue = values['release-range-picker'];
        // let releasefrom = '1900-01-01';
        // let releaseto = '2500-01-01';
        // if (rangeValue !== undefined) {
        //     releasefrom = rangeValue[0].format('YYYY-MM-DD');
        //     releaseto = rangeValue[1].format('YYYY-MM-DD'); 
        // }        
        // let ratingmin = 0;
        // let ratingmax = 10;
        // if (values['ratingmin'] !== undefined) {
        //     ratingmin = values['ratingmin'];
        // }
        // if (values['ratingmax'] !== undefined) {
        //     ratingmax = values['ratingmax'];
        // }
        props.filter(name);
    };

    const checkInput = (input) => {        
        if (input === undefined)
            return '';
        else 
            return input;
    }

    return (
        <div>
            <Form                        
                name="filter-form"
                className="filter-form"          
                layout="vertical"              
                onFinish={onFinish}                    
            >
                <h2>Уран бүтээлч хайх</h2>
                <Form.Item
                    name="name"                            
                    label="Уран бүтээлчийн нэр"                    
                >
                    <Input placeholder="Уран бүтээлчийн нэр" />
                </Form.Item>
                <Form.Item name="department" label="Мэргэжил">
                    <Select
                        placeholder="Мэргэжил"                                
                        allowClear
                    >
                        <Option value="actor">Actor</Option>
                        <Option value="director">Director</Option>
                        <Option value="producer">Producer</Option>
                        <Option value="screenwriter">Screenwriter</Option>
                    </Select>
                </Form.Item>                           
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="search-button">
                    Хайх
                    </Button>                            
                </Form.Item>
            </Form>
        </div>
    );
}

export default MovieFilterForm;