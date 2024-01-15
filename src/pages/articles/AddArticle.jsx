import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import Ckeditor from '../../components/Ckeditor';


const AddArticle = ({ selectedArticleId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);
    const [author, setAuthor] = useState('');


    useEffect(() => {
        if (selectedArticleId) {
            axios.get(`http://localhost:4000/api/article/${selectedArticleId}`).then((res) => {
                const article = res.data.article;
                setTitle(article.title);
                setContent(article.content);
                setImage(article.image);
                setAuthor(article.author);
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }, [selectedArticleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }
        formData.append('author', author);

        try {
            if (selectedArticleId) {
                const res = await axios.put(`http://localhost:4000/api/article/${selectedArticleId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                swal({
                    title: "عملیات موفقیت آمیز بود",
                    text: "!محصول ویرایش شد",
                    icon: "success",
                    button: "متوجه شدم",
                }).then(() => {
                    window.location.reload()
                });
                console.log(res.data);
            } else {
                const res = await axios.post('http://localhost:4000/api/article', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                swal({
                    title: "عملیات موفقیت آمیز بود",
                    text: "!محصول ایجاد شد",
                    icon: "success",
                    button: "متوجه شدم",
                }).then(() => {
                    window.location.reload()
                });
                console.log(res.data);
            }
        } catch (error) {
            swal({
                title: "خطایی رخ داده!",
                text: error.message,
                icon: "warning",
                button: "متوجه شدم",
            });
            console.log(error.message);
        }
    }
    return (
        <form className='container w-100' onSubmit={handleSubmit}>
            <div className='modal_fields'>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="title">نام محصول</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='نام محصول' id="title" type="text" className='px-3 py-2 rounded-3 w-100' />
                </div>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="content">توضیحات محصول</label>
                    <Ckeditor placeholder="توضیحات محصول" className='w-100' onChange={(data) => setContent(data)} />
                </div>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="imageUrl">تصویر محصول</label>
                    <input onChange={(e) => setImage(Array.from(e.target.files))} placeholder='تصویر محصول' id="imageUrl" type="file" className='px-3 py-2 rounded-3 w-100' multiple />
                </div>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="productCode">کد محصول</label>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='کد محصول' id="productCode" type="text" className='px-3 py-2 rounded-3 w-100' />
                </div>
            </div>
            <div className="submit_btn mt-3 mb-5">
                <button type='submit' className='btn btn-primary px-3 mx-2'>ذخیره</button>
            </div>
        </form>
    )
}

export default AddArticle
