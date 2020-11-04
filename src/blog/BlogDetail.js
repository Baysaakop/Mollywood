import React, { useEffect, useState } from 'react';
import '../css/ContentDetail.css';
import { Breadcrumb } from 'antd';

const BlogDetail = (props) => {    

    const api_key = process.env.REACT_APP_API;
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${props.match.params.artistID}?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            console.log(data);          
            setBlog(data);
        })        
    }, []);    

    return (
        <div>
            <Breadcrumb style={{ padding: '16px' }}>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/blogs">Блог</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {blog.name}
                </Breadcrumb.Item>
            </Breadcrumb> 
            <div className="main">
            </div>
        </div>
    );
};

export default BlogDetail;