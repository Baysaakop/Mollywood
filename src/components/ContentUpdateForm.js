import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button, Upload, Popconfirm, message } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import moment from 'moment';
import movielist from '../movielist.json';
import genrelist from '../genrelist.json';
import artistlist from '../artistlist.json';

const { TextArea } = Input;
const { Option } = Select;

const ContentUpdateForm = (props) => {    
    const [form] = Form.useForm();    
    const [content, setContent] = useState({});
    const [contents, setContents] = useState([]);
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {                       
        setContents(movielist);   
        setGenres(genrelist);
        setDirectors(artistlist.filter((a) => a.occupations.includes(3)));        
        setActors(artistlist.filter((a) => a.occupations.includes(1)));        
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

    const onSelectMovie = item => {                
        setContent(contents.find((m) => parseInt(m.id) === parseInt(item)));       
        form.resetFields();
    }

    const onFinish = values => {
        console.log(values);
    }

    const onReset = () => {
        form.resetFields();
    };

    function deleteConfirm(e) {
        console.log(e);
        message.success('Устгагдлаа.');
    }

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
                    name="selectcontent"
                    label="Кино сонгох"
                >
                    <Select                                   
                        defaultValue={content.name} 
                        showSearch                                                                                             
                        optionFilterProp="children"
                        filterOption={(input, option) => 
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onSelect={onSelectMovie}
                        style={{  }}
                    >
                        {contents.map((c) => 
                            <Option key={c.id} value={c.id}>{c.name}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="name"                            
                    label="Нэр"          
                    rules={[{ required: true }]}        
                >
                    <Input placeholder="Нэр" defaultValue={content.name} />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Танилцуулга"
                    rules={[{ required: true }]}  
                >
                    <TextArea rows={4} defaultValue={content.description} />
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
                    <DatePicker defaultValue={moment(content.release_date, dateFormat)} />
                </Form.Item>
                <Form.Item
                    name="runningtime"
                    label="Үргэлжлэх хугацаа"                                  
                >
                    <InputNumber defaultValue={content.runningtime} />
                </Form.Item>
                <Form.Item 
                    name="genre" 
                    label="Төрөл жанр"
                >
                    <Select
                        showSearch
                        defaultValue={content.genres}
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
                <Form.Item 
                    {...layoutImage}
                    name="image"
                    label="Зураг"                                        
                >
                    <Upload.Dragger 
                        name="poster" 
                        action="/upload.do" 
                        multiple={false}                        
                    >
                        <p className="ant-upload-drag-icon">
                            <FileImageOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger> 
                </Form.Item>                                                     
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="savebutton" style={{ marginRight: '8px' }}>
                        Хадгалах
                    </Button> 
                    <Button htmlType="button" className="resetbutton" style={{ marginRight: '8px' }} onClick={onReset}>
                        Буцаах
                    </Button>
                    { Object.entries(content).length > 0 ? (
                        <Popconfirm
                            title="Энэ контентийг устгахдаа итгэлтэй байна уу?"
                            onConfirm={deleteConfirm}
                            okText="Тийм"
                            cancelText="Үгүй"
                        >
                            <Button type="primary" danger htmlType="button" className="deletebutton" style={{ marginRight: '8px' }}>
                                Устгах
                            </Button>                            
                        </Popconfirm>
                    ) : (
                        <>
                        </>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
}

export default ContentUpdateForm;