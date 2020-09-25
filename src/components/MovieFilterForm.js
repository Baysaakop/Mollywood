import React from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';

import './MovieFilterForm.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const MovieFilterForm = (props) => {

    const onFinish = values => {        
        let name = checkInput(values['name']);           
        let genre = checkInput(values['genre']);        
        let rangeValue = values['release-range-picker'];
        let releasefrom = '1900-01-01';
        let releaseto = '2500-01-01';
        if (rangeValue != undefined) {
            releasefrom = rangeValue[0].format('YYYY-MM-DD');
            releaseto = rangeValue[1].format('YYYY-MM-DD'); 
        }        
        let ratingmin = 0;
        let ratingmax = 10;
        if (values['ratingmin'] != undefined) {
            ratingmin = values['ratingmin'];
        }
        if (values['ratingmax'] != undefined) {
            ratingmax = values['ratingmax'];
        }
        // const ratingmin = values['ratingmin'];
        // const ratingmax = values['ratingmax'];
        
        // const printValues = {
        //     'name': values['name'],
        //     'genre': values['genre'],
        //     'releasefrom': rangeValue[0].format('YYYY-MM-DD'),
        //     'releaseto': rangeValue[1].format('YYYY-MM-DD'),
        //     // 'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        //     'ratingmin': values['ratingmin'],
        //     'ratingmax': values['ratingmax'],
        // }
        // console.log('Received values of form: ', printValues);
        props.filter(name, genre, releasefrom, releaseto, ratingmin, ratingmax);
    };

    const checkInput = (input) => {        
        if (input == undefined)
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
                <h2>Кино хайх</h2>
                <Form.Item
                    name="name"                            
                    label="Киноны нэр"                    
                >
                    <Input placeholder="Киноны нэр" />
                </Form.Item>
                <Form.Item name="genre" label="Төрөл жанр">
                    <Select
                        placeholder="Төрөл жанр"                                
                        allowClear
                    >
                        <Option value="adventure">Адал явпал</Option>
                        <Option value="horror">Аймшиг</Option>
                        <Option value="drama">Драм</Option>
                        <Option value="crime">Гэмт хэрэг</Option>
                        <Option value="comedy">Инээдмийн</Option>
                        <Option value="fantasy">Уран Зөгнөлт</Option>
                        <Option value="epic">Түүхэн</Option>
                    </Select>
                </Form.Item>           
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