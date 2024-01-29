import React, { useEffect, useState } from 'react'
import Actions from './Actions';
import swal from 'sweetalert';
import axios from 'axios';
import PaginatedTable from '../../components/PaginatedTable';

const CommentTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/comments').then((res) => {
            console.log(res.data.comments);
            setData(res.data.comments)
        }).catch((error) => {
            console.log(error.message);
        })
    }, []);

    const handleDeleteComment = async (commentId) => {
        await swal({
            title: "آیا از عملیات حذف مطمئن هستید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:4000/api/comment/${commentId}`)
                    .then((res) => {
                        console.log(res.data);
                        setData(data.filter((d) => d._id !== commentId));
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
        { field: 'createdAt', title: 'تاریخ' },
        { field: 'email', title: 'ایمیل' },
        { field: 'content', title: 'توضیحات' },
    ]

    const additionalField = [
        {
            title: 'ویرایش',
            elements: (rowData) => <Actions
                rowData={rowData}
                handleDeleteComment={handleDeleteComment} />
        }
    ]
    return (
        <PaginatedTable
            dataInfo={dataInfo}
            data={data}
            additionalField={additionalField}
        />
    )
}

export default CommentTable