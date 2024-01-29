import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import PaginatedTable from '../../components/PaginatedTable';
import Actions from './Actions';
import AddEquippedGym from './AddEquippedGym';

const EquippedGymTable = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [selectedEquippedGymId, setSelectedEquippedGymId] = useState('');


    useEffect(() => {
        axios.get('http://localhost:4000/api/equippedGyms').then((res) => {
            console.log(res.data.equippedGyms);
            setData(res.data.equippedGyms);
        }).catch((error) => {
            console.log(error.message);
        })
    }, []);

    const handleShowModal = (equippedGymId, breakpoint) => {
        setFullscreen(breakpoint);
        setSelectedEquippedGymId(equippedGymId ? equippedGymId : '');
        console.log(equippedGymId ? equippedGymId : '');
        setShow(true);
    }



    const handleDeleteEquippedGym = async (equippedGymId) => {
        await swal({
            title: "آیا از عملیات حذف مطمئن هستید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:4000/api/equippedGym/${equippedGymId}`)
                    .then((res) => {
                        console.log(res.data);
                        setData(data.filter((d) => d._id !== equippedGymId));
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
        { field: 'address', title: 'آدرس' },
    ]

    const additionalField = [
        {
            title: 'ویرایش',
            elements: (rowData) => <Actions
                rowData={rowData}
                handleDeleteEquippedGym={handleDeleteEquippedGym}
                handleShowModal={handleShowModal}
            />
        }
    ]

    return (
        <PaginatedTable
            data={data}
            additionalField={additionalField}
            dataInfo={dataInfo}
            handleShowModal={handleShowModal}
        >
            <AddEquippedGym
                selectedEquippedGymId={selectedEquippedGymId}
                show={show}
                setShow={setShow}
                modalTitle="باشگاه های تجهیزشده"
            />
        </PaginatedTable>
    )
}

export default EquippedGymTable
