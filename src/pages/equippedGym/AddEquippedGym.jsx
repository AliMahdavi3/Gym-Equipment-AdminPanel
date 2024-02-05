import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import ModalContainer from '../../components/ModalContainer';
import SubmitButton from '../../components/SubmitButton';

const AddEquippedGym = ({ selectedEquippedGymId, show, setShow, modalTitle }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);
    const [address, setAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (selectedEquippedGymId) {
            axios.get(`https://api.iliyafitness.com/api/equippedGym/${selectedEquippedGymId}`).then((res) => {
                const equippedGym = res.data.equippedGym;
                setTitle(equippedGym.title);
                setContent(equippedGym.content);
                setImage(equippedGym.image);
                setAddress(equippedGym.address);
            }).catch((error) => {
                swal({
                    title: "خطایی رخ داده!",
                    text: error.message,
                    icon: "warning",
                    button: "متوجه شدم",
                });            })
        }
    }, [selectedEquippedGymId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }
        formData.append('address', address);

        try {
            if (selectedEquippedGymId) {
                const res = await axios.put(`https://api.iliyafitness.com/api/equippedGym/${selectedEquippedGymId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                swal({
                    title: "عملیات موفقیت آمیز بود",
                    text: "!باشگاه ویرایش شد",
                    icon: "success",
                    button: "متوجه شدم",
                }).then(() => {
                    window.location.reload()
                });
            } else {
                const res = await axios.post('https://api.iliyafitness.com/api/equippedGym', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                swal({
                    title: "عملیات موفقیت آمیز بود",
                    text: "!باشگاه ایجاد شد",
                    icon: "success",
                    button: "متوجه شدم",
                }).then(() => {
                    window.location.reload()
                });
            }
        } catch (error) {
            swal({
                title: "خطایی رخ داده!",
                text: error.message,
                icon: "warning",
                button: "متوجه شدم",
            });
        }
    }
    
    return (
        <ModalContainer show={show} setShow={setShow} modalTitle={modalTitle}>
            <form className='container w-100' onSubmit={handleSubmit}>
                <div className='modal_fields'>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="title">نام باشگاه</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)}
                            placeholder='نام باشگاه' id="title" type="text" className='px-3 py-2 rounded-3 w-100' />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="content">توضیحات باشگاه</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)}
                            placeholder='توضیحات باشگاه' id="content" name="" className='px-3 py-2 rounded-3 w-100'
                            cols="30" rows="10"></textarea>
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold fs-5 text-success' 
                        htmlFor="imageUrl">حداقل 4 تصویر انتخاب کنید</label>
                        <input onChange={(e) => setImage(Array.from(e.target.files))}
                            placeholder='تصاویر' id="imageUrl" type="file" 
                            className='px-3 py-2 form-control rounded-3 w-100' multiple />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="address">آدرس</label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)}
                            placeholder='آدرس' id="address" type="text" className='px-3 py-2 rounded-3 w-100' />
                    </div>
                </div>
                <SubmitButton isSubmitting={isSubmitting}/>
            </form>
        </ModalContainer>
    )
}

export default AddEquippedGym
