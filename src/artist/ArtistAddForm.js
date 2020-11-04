import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';
import occupationlist from '../data/occupationlist.json';

const { TextArea } = Input;
const { Option } = Select;

const ArtistAddForm = () => {    
    const [form] = Form.useForm();
    const [occupations, setOccupations] = useState([]);

    useEffect(() => {
        setOccupations(occupationlist);              
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
                    label="Харагдах нэр"          
                    rules={[{ required: true }]}        
                >
                    <Input placeholder="Бат-Эрдэнэ.Б" />
                </Form.Item>
                <Form.Item                    
                    name="firstname"                            
                    label="Нэр"                                     
                >
                    <Input placeholder="Бат-Эрдэнэ" />
                </Form.Item>
                <Form.Item
                    name="lastname"                            
                    label="Овог"                                      
                >
                    <Input placeholder="Овог" />
                </Form.Item>                
                <Form.Item
                    name="biography"
                    label="Танилцуулга"
                    rules={[{ required: true }]}  
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="birthdate"
                    label="Төрсөн өдөр"  
                >
                    <DatePicker defaultValue={moment()} />
                </Form.Item>
                <Form.Item 
                    name="occupation" 
                    label="Мэргэжил"
                >
                    <Select
                        showSearch
                        mode="multiple"                                                                              
                        optionFilterProp="children"
                        filterOption={(input, option) => 
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {occupations.map((o) => 
                            <Option key={o.id} value={o.id}>{o.name_mn}</Option>
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

export default ArtistAddForm;