import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';
import '../css/FilterForm.css';
import occupationlist from '../data/occupationlist.json';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ArtistFilterForm = (props) => {
    
    const [occupations, setOccupations] = useState([]);

    useEffect(() => {
        setOccupations(occupationlist);
    }, []);        

    const onFinish = values => {       
        let name = checkInput(values['name']);        
        let occupation = checkInput(values['occupation']);                           
        let yearfrom = checkInput(values['yearfrom']);
        let yearto = checkInput(values['yearto']);
        let result = props.contents;        
        if (name !== '') {
            result = result.filter((content) => content.name.toLowerCase().includes(name.toLowerCase()));            
        }       
        if (occupation !== '' && occupation !== 0) {                 
            result = result.filter((content) => content.occupations.includes(occupation));            
        }        
        if (yearfrom !== '') {
            var datefrom = new Date(yearfrom, 0, 1);            
            result = result.filter((content) => (new Date(content.birthdate)) > datefrom);
        }
        if (yearto !== '') {
            var dateto = new Date(yearto, 11, 31);            
            result = result.filter((content) => (new Date(content.birthdate)) < dateto);
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
                        <Form.Item name="occupation" label="Мэргэжил" className="formrow">
                            <Select
                                defaultValue={0}                                                 
                                allowClear
                            >
                                <Option key={0} value={0}>Бүх</Option>
                                {occupations.map((o) => 
                                    <Option key={o.id} value={o.id}>{o.name_mn}</Option>
                                )}
                            </Select>
                        </Form.Item> 
                        <Form.Item label="Төрсөн өдөр" className="formrow">
                            <Form.Item name="yearfrom" style={{ display: 'inline-block' }}>
                                <InputNumber defaultValue={1900} min={1900} max={2020} />
                            </Form.Item>
                            <Form.Item name="yearto" style={{ display: 'inline-block', margin: '0 8px' }}>
                                <InputNumber defaultValue={2020} min={1900} max={2020} />
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

export default ArtistFilterForm;