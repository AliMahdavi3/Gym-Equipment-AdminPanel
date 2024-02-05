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
        axios.get('https://api.iliyafitness.com/api/equippedGyms').then((res) => {
            setData(res.data.equippedGyms);
        }).catch((error) => {
            swal({
                title: "خطایی رخ داده!",
                text: error.message,
                icon: "warning",
                button: "متوجه شدم",
            });        })
    }, []);

    const handleShowModal = (equippedGymId, breakpoint) => {
        setFullscreen(breakpoint);
        setSelectedEquippedGymId(equippedGymId ? equippedGymId : '');
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
                axios.delete(`https://api.iliyafitness.com/api/equippedGym/${equippedGymId}`)
                    .then((res) => {
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
