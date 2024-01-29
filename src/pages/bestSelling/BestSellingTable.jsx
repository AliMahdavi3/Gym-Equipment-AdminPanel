import React, { useEffect, useState } from 'react'
import Actions from './Actions'
import PaginatedTable from '../../components/PaginatedTable'
import axios from 'axios';
import swal from 'sweetalert';
import AddBestSelling from './AddBestSelling';

const BestSellingTable = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [selectedBestSellingId, setSelectedBestSellingId] = useState('');


    useEffect(() => {
        axios.get('http://localhost:4000/api/bestSellings').then((res) => {
            console.log(res.data.bestSellings);
            setData(res.data.bestSellings)
        }).catch((error) => {
            console.log(error.message);
        })
    }, []);

    const handleShowModal = (bestSellingId, breakpoint) => {
        setFullscreen(breakpoint);
        setSelectedBestSellingId(bestSellingId ? bestSellingId : '');
        console.log(bestSellingId ? bestSellingId : '');
        setShow(true);
    }

    const handleDeleteBestSelling = async (bestSellingId) => {
        await swal({
            title: "آیا از عملیات حذف مطمئن هستید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:4000/api/bestSellings/${bestSellingId}`)
                    .then((res) => {
                        console.log(res.data);
                        setData(data.filter((d) => d._id !== bestSellingId));
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
    ]

    const additionalField = [
        {
            title: 'ویرایش',
            elements: (rowData) => <Actions
                rowData={rowData}
                handleDeleteBestSelling={handleDeleteBestSelling}
                handleShowModal={handleShowModal}
            />
        }
    ]

    return (
        <PaginatedTable
            dataInfo={dataInfo}
            data={data}
            additionalField={additionalField}
            handleShowModal={handleShowModal}
        >
            <AddBestSelling
                selectedBestSellingId={selectedBestSellingId}
                setShow={setShow}
                show={show}
                modalTitle='پرفروشترین محصولات'
            />
        </PaginatedTable>
    )
}

export default BestSellingTable
