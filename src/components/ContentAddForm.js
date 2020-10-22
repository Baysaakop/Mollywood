import React, { useEffect, useState } from 'react';
import { Menu, Form, Input, DatePicker, InputNumber, Select, Button } from 'antd';
import moment from 'moment';
import genrelist from '../genrelist.json';
import artistlist from '../artistlist.json';

const { SubMenu } = Menu;
const { TextArea } = Input;
const { Option } = Select;

const ContentAddForm = (props) => {    
    const [form] = Form.useForm();
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        setGenres(genrelist);
        setDirectors(artistlist.filter((a) => a.occupations.includes(3)));        
        setActors(artistlist.filter((a) => a.occupations.includes(1)));        
    }, []);       

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

    const onFinish = values => {
        console.log(values);
    }

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className="addform">
            <Form              
                {...layout}            
                form={form}                
                name="movieform"                                                              
                onFinish={onFinish}                    
            >
                <Form.Item
                    name="name"                            
                    label="Нэр"          
                    rules={[{ required: true }]}        
                >
                    <Input placeholder="Нэр" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Танилцуулга"
                    rules={[{ required: true }]}  
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="plot"
                    label="Агуулга"  
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="releasedate"
                    label="Нээлтийн огноо"  
                >
                    <DatePicker defaultValue={moment()} />
                </Form.Item>
                <Form.Item
                    name="runningtime"
                    label="Үргэлжлэх хугацаа"                                  
                >
                    <InputNumber defaultValue={90} />
                </Form.Item>
                <Form.Item 
                    name="genre" 
                    label="Төрөл жанр"
                >
                    <Select
                        showSearch
                        mode="multiple"                                                                              
                        optionFilterProp="children"
                        filterOption={(input, option) => 
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {genres.map((genre) => 
                            <Option key={genre.id} value={genre.id}>{genre.name_mn}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item 
                    name="director" 
                    label="Найруулагч"
                >
                    <Select
                        showSearch
                        mode="multiple"                                                                                 
                        optionFilterProp="children"
                        filterOption={(input, option) => 
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {directors.map((director) => 
                            <Option key={director.id} value={director.id}>{director.name}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item 
                    name="actors" 
                    label="Гол дүр"
                >
                    <Select
                        showSearch
                        mode="multiple"                                                                                 
                        optionFilterProp="children"
                        filterOption={(input, option) => 
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {actors.map((actor) => 
                            <Option key={actor.id} value={actor.id}>{actor.name}</Option>
                        )}
                    </Select>
                </Form.Item>                                                        
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="savebutton" style={{ marginRight: '8px' }}>
                        Хадгалах
                    </Button> 
                    <Button htmlType="button" className="resetbutton" style={{ marginRight: '8px' }} onClick={onReset}>
                        Арилгах
                    </Button>                            
                </Form.Item>
            </Form>
        </div>
    );
}

export default ContentAddForm;