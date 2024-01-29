import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import swal from 'sweetalert';
import 'react-quill/dist/quill.snow.css';
import ModalContainer from '../../components/ModalContainer';

const AddArticle = ({ selectedArticleId, show, setShow, modalTitle }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState([]);
    const [author, setAuthor] = useState('');
    const [value, setValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('value', value);
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
                    text: "!مقاله ویرایش شد",
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
                    text: "!مقاله ایجاد شد",
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

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
        ],
    }
    return (
        <ModalContainer show={show} setShow={setShow} modalTitle={modalTitle}>
            <form className='container w-100' onSubmit={handleSubmit}>
                <div className='modal_fields'>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="title">موضوع مقاله</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='موضوع مقاله' id="title" type="text" className='px-3 py-2 rounded-3 w-100' />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="content">محتوا</label>
                        <ReactQuill className='w-100' theme="snow" modules={modules} value={value}
                            onChange={setValue} />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="imageUrl">تصویر</label>
                        <input onChange={(e) => setImage(Array.from(e.target.files))} placeholder='تصویر' id="imageUrl" type="file" className='px-3 py-2 rounded-3 w-100' multiple />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="productCode">نویسنده</label>
                        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='نویسنده' id="productCode" type="text" className='px-3 py-2 rounded-3 w-100' />
                    </div>
                </div>
                <div className="submit_btn mt-3 mb-5">
                    <button type='submit' className='btn btn-primary px-3 mx-2'>ذخیره</button>
                </div>
            </form>
        </ModalContainer>
    )
}

export default AddArticle
