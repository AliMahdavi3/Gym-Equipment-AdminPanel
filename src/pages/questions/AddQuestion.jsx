import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import ModalContainer from '../../components/ModalContainer';
import SubmitButton from '../../components/SubmitButton';

const AddQuestion = ({ selectedQuestionId, show, setShow, modalTitle }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (selectedQuestionId) {
            axios.get(`https://api.iliyafitness.com/api/question/${selectedQuestionId}`).then((res) => {
                const question = res.data.question;
                setTitle(question.title);
                setContent(question.content);
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }, [selectedQuestionId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        try {
            if (selectedQuestionId) {
                const res = await axios.put(`https://api.iliyafitness.com/api/question/${selectedQuestionId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                swal({
                    title: "عملیات موفقیت آمیز بود",
                    text: "!سوال ویرایش شد",
                    icon: "success",
                    button: "متوجه شدم",
                }).then(() => {
                    window.location.reload()
                });
                console.log(res.data);
            } else {
                const res = await axios.post('https://api.iliyafitness.com/api/question', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                swal({
                    title: "عملیات موفقیت آمیز بود",
                    text: "!سوال ایجاد شد",
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
        <ModalContainer show={show} setShow={setShow} modalTitle={modalTitle}>
            <form className='container w-100' onSubmit={handleSubmit}>
                <div className='modal_fields'>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="title">سوال</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='سوال' id="title" type="text" className='px-3 py-2 rounded-3 w-100' />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="content">پاسخ</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='پاسخ' id="content" name="" className='px-3 py-2 rounded-3 w-100'
                            cols="30" rows="10"></textarea>
                    </div>
                </div>
                <SubmitButton isSubmitting={isSubmitting}/>
            </form>
        </ModalContainer>
    )
}

export default AddQuestion
