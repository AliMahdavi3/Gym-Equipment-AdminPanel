import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import Actions from './Actions'
import axios from 'axios';
import swal from 'sweetalert';
import AddProduct from './AddProduct';

const ProductTable = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');

    useEffect(() => {
        axios.get('https://api.iliyafitness.com/api/products').then((res) => {
            setData(res.data.products)
        }).catch((error) => {
            swal({
                title: "خطایی رخ داده!",
                text: error.message,
                icon: "warning",
                button: "متوجه شدم",
            });        })
    }, []);


    const handleShowModal = (productId, breakpoint) => {
        setFullscreen(breakpoint);
        setSelectedProductId(productId ? productId : '');
        setShow(true);
    }

    const handleDeleteProduct = async (productId) => {
        await swal({
            title: "آیا از عملیات حذف مطمئن هستید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://api.iliyafitness.com/api/product/${productId}`)
                    .then((res) => {
                        setData(data.filter((d) => d._id !== productId));
                        swal("اطلاعات موردنظر حذف شد!", {
                            icon: "success",
                        })
                    })
                    .catch((error) => {
                        swal({
                            title: "خطایی رخ داده!",
                            text: error.message,
                            icon: "warning",
                            button: "متوجه شدم",
                        });
                    });
            } else {
                swal("!عملیات متوقف شد");
            }
        });
    };
    const dataInfo = [
        { field: 'title', title: 'نام' },
        { field: 'content', title: 'توضیحات' },
        { field: 'imageUrl', title: 'تصویر' },
        { field: 'productCode', title: 'کد محصول' },
        { field: 'category', title: 'دسته بندی' },
    ]

    const additionalField = [
        {
            title: 'ویرایش',
            elements: (rowData) => <Actions
                rowData={rowData}
                handleDeleteProduct={handleDeleteProduct}
                handleShowModal={handleShowModal}
            />
        }
    ]
    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            additionalField={additionalField}
            handleShowModal={handleShowModal}
        >
            <AddProduct
                show={show}
                setShow={setShow}
                selectedProductId={selectedProductId}
                modalTitle="محصولات"
            />
        </PaginatedTable>
    )
}

export default ProductTable
