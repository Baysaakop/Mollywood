import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button } from 'antd';
import moment from 'moment';
import artistlist from '../artistlist.json';
import occupationlist from '../occupationlist.json';

const { TextArea } = Input;
const { Option } = Select;

const ArtistUpdateForm = () => {    
    const [form] = Form.useForm();
    const [artist, setArtist] = useState({});
    const [artists, setArtists] = useState([]);
    const [occupations, setOccupations] = useState([]);

    useEffect(() => {
        setArtists(artistlist);
        setOccupations(occupationlist);              
    }, []);       

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const layoutImage = {
        labelCol: { span: 4 },
        wrapperCol: { span: 4 },
    }

    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

    const onSelectArtist = item => {                
        setArtist(artists.find((a) => parseInt(a.id) === parseInt(item)));       
        form.resetFields();
    }

    const onFinish = values => {
        console.log(values);
    }

    const onReset = () => {
        form.resetFields();
    };

    const dateFormat = 'YYYY-MM-DD';

    return (
        <div className="addform">
            <Form              
                {...layout}            
                form={form}                
                name="movieform"                                                              
                onFinish={onFinish}                    
            >
                <Form.Item
                    name="selectartist"
                    label="Уран бүтээлч сонгох"
                >
                    <Select                                   
                        defaultValue={artist.name} 
                        showSearch                                                                                             
                        optionFilterProp="children"
                        filterOption={(input, option) => 
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onSelect={onSelectArtist}
                        style={{  }}
                    >
                        {artists.map((a) => 
                            <Option key={a.id} value={a.id}>{a.name}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item                    
                    name="name"                            
                    label="Харагдах нэр"          
                    rules={[{ required: true }]}        
                >
                    <Input placeholder="Бат-Эрдэнэ.Б" defaultValue={artist.name} />
                </Form.Item>
                <Form.Item                    
                    name="firstname"                            
                    label="Нэр"                                     
                >
                    <Input placeholder="Бат-Эрдэнэ" defaultValue={artist.firstname} />
                </Form.Item>
                <Form.Item                    
                    name="lastname"                            
                    label="Овог"                                      
                >
                    <Input placeholder="Болд" defaultValue={artist.lastname} />
                </Form.Item>                
                <Form.Item                    
                    name="biography"
                    label="Танилцуулга"
                    rules={[{ required: true }]}  
                >
                    <TextArea rows={4} defaultValue={artist.biography} />
                </Form.Item>
                <Form.Item

                    name="birthdate"
                    label="Төрсөн өдөр"  
                >
                    <DatePicker defaultValue={ Object.entries(artist).length > 0 ? moment(artist.birthdate, dateFormat) : moment()} />
                </Form.Item>
                <Form.Item 
                    name="occupation" 
                    label="Мэргэжил"
                >
                    <Select
                        defaultValue={artist.occupations}
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
                        Буцаах
                    </Button>    
                    { Object.entries(artist).length > 0 ? (
                        <Button type="primary" danger htmlType="button" className="deletebutton" style={{ marginRight: '8px' }}>
                            Устгах
                        </Button>                            
                    ) : (
                        <>
                        </>
                    )}                        
                </Form.Item>
            </Form>
        </div>
    );
}

export default ArtistUpdateForm;