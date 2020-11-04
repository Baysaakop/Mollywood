import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined, FileImageOutlined } from '@ant-design/icons';
import moment from 'moment';
import genrelist from '../data/genrelist.json';
import artistlist from '../data/artistlist.json';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng ;
  }

const ContentAddForm = () => {    
    const [form] = Form.useForm();
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
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

    const onFinish = values => {
        let jsonData = JSON.stringify(values)
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOWU3ODI5YjY2OWFjMzZmODU2MmM1NyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNDIyMjA4OSwiZXhwIjoxNjA0ODI2ODg5fQ.Go-0E0NzV74TcQoEiGL-fQvFRwzeX_0iUd_uYSqdVIU";        
        let dir = values.director[0]
        axios({
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://192.168.0.104:8000/api/v1/movies',
            data: {
                name: values.name,
                description: values.description,                
                releaseDate: values.releaseDate,
                averageRating: 8.5,
                genreId: '5f54db5b2f7ecd22605d613e',
                director: dir,
                duration: values.duration,
                language: "mn",              
                isInCinema: false,
                isUpcoming: false
            }
        })
        .then(res => {
            console.log(res);            
        })
        console.log();
    }

    const onReset = () => {
        form.resetFields();
    };

    const handleImageUpload = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                setImageUrl(imageUrl),
                setLoading(true)
            );           
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

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
                    name="releaseDate"
                    label="Нээлтийн огноо"  
                >
                    <DatePicker defaultValue={moment()} />
                </Form.Item>
                <Form.Item
                    name="duration"
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
                            <Option key={director.name} value={director.id}>{director.name}</Option>
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
                {/* <Form.Item
                    name="image"
                    label="Зураг"
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleImageUpload}                        
                    >
                        { imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton }
                    </Upload>
                </Form.Item> */}
                <Form.Item 
                    {...layoutImage}
                    name="image"
                    label="Зураг"                                        
                >
                    <Upload.Dragger name="poster" action="/upload.do" multiple={false}>
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
                        Арилгах
                    </Button>                            
                </Form.Item>
            </Form>
        </div>
    );
}

export default ContentAddForm;