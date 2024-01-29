import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import axios from 'axios';
import swal from 'sweetalert';
import Actions from './Actions';

const DashboardTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/sendMessages').then((res) => {
            console.log(res.data.sendMessages);
            setData(res.data.sendMessages)
        }).catch((error) => {
            console.log(error.message);
        })
    }, []);

    const handleDeleteQuestion = async (messageId) => {
        await swal({
            title: "آیا از عملیات حذف مطمئن هستید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:4000/api/sendMessage/${messageId}`)
                    .then((res) => {
                        console.log(res.data);
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
