import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import axios from 'axios';
import swal from 'sweetalert';
import Actions from './Actions';

const DashboardTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://api.iliyafitness.com/api/sendMessages').then((res) => {
            setData(res.data.sendMessages)
        }).catch((error) => {
            swal({
                title: "خطایی رخ داده!",
                text: error.message,
                icon: "warning",
                button: "متوجه شدم",
            });        })
    }, []);

    const handleDeleteQuestion = async (messageId) => {
        await swal({
            title: "آیا از عملیات حذف مطمئن هستید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://api.iliyafitness.com/api/sendMessage/${messageId}`)
                    .then((res) => {
                        setData(data.filter((d) => d._id !== messageId));
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
        { field: 'name', title: 'نام' },
        { field: 'content', title: 'توضیحات' },
        { field: 'phoneNumber', title: 'شماره تلفن' },
    ]

    const additionalField = [
        {
            title: 'ویرایش',
            elements: (rowData) => <Actions
                rowData={rowData}
                handleDeleteQuestion={handleDeleteQuestion}
            />
        }
    ]

    return (
        <PaginatedTable
            data={data}
            additionalField={additionalField}
            dataInfo={dataInfo}
        />
    )
}

export default DashboardTable
