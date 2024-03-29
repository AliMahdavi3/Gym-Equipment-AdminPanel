import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import ModalContainer from '../../components/ModalContainer';
import SubmitButton from '../../components/SubmitButton';

const AddProduct = ({ selectedProductId, setShow, show, modalTitle }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (selectedProductId) {
            axios.get(`https://api.iliyafitness.com/api/product/${selectedProductId}`).then((res) => {
                const product = res.data.product;
                setTitle(product.title);
                setContent(product.content);
                setImage(product.image);
                setProductCode(product.productCode);
                setCategory(product.category);
            }).catch((error) => {
                swal({
                    title: "خطایی رخ داده!",
                    text: error.message,
                    icon: "warning",
                    button: "متوجه شدم",
                });            })
        }
    }, [selectedProductId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }
        formData.append('productCode', productCode);
        formData.append('category', category);

        try {
            if (selectedProductId) {
                const res = await axios.put(`https://api.iliyafitness.com/api/product/${selectedProductId}`, formData, {
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
            } else {
                const res = await axios.post('https://api.iliyafitness.com/api/product', formData, {
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
                        <label className='mb-2 fw-semibold' htmlFor="title">نام محصول</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='نام محصول' id="title" type="text" className='px-3 py-2 rounded-3 w-100' />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="content">توضیحات محصول</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='توضیحات محصول' id="content" name="" className='px-3 py-2 rounded-3 w-100'
                            cols="30" rows="10"></textarea>
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 text-success fs-4 fw-semibold' htmlFor="imageUrl">حداقل 4 تصویر انتخاب کنید</label>
                        <input onChange={(e) => setImage(Array.from(e.target.files))} placeholder='تصویر محصول' id="imageUrl" type="file" 
                        className='px-3 py-2 rounded-3 form-control w-100' multiple />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="productCode">کد محصول</label>
                        <input value={productCode} onChange={(e) => setProductCode(e.target.value)} placeholder='کد محصول' id="productCode" type="text" className='px-3 py-2 rounded-3 w-100' />
                    </div>
                    <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                        <label className='mb-2 fw-semibold' htmlFor="category">دسته بندی محصول</label>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder='دسته بندی محصول' id="category" type="text" className='px-3 py-2 rounded-3 w-100' />
                    </div>
                </div>
              <SubmitButton isSubmitting={isSubmitting}/>
            </form>
        </ModalContainer>
    )
}

export default AddProduct
