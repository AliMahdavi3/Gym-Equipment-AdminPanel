import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import moment from 'moment-jalaali';
import axios from 'axios';
import swal from 'sweetalert';
import PaginatedTable from '../../components/PaginatedTable';

const Comments = () => {
    const [data, setData] = useState([]);
    // const [searchTerm, setSearchTerm] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage] = useState(5);


    useEffect(() => {
        axios.get('http://localhost:4000/api/comments').then((res) => {
            console.log(res.data.comments);
            setData(res.data.comments)
        }).catch((error) => {
            console.log(error.message);
        })
    }, []);

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = data
    //     .filter(
    //         (d) =>
    //             d.name.includes(searchTerm) ||
    //             d.email.includes(searchTerm) ||
    //             d.content.includes(searchTerm)
    //     )
    //     .slice(0)
    //     .reverse()
    //     .slice(indexOfFirstItem, indexOfLastItem);

    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // }


    // const totalPages = Math.ceil(data.length / itemsPerPage);
    // const paginationLinks = [];

    // for (let i = 1; i <= totalPages; i++) {
    //     paginationLinks.push(
    //         <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
    //             <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
    //         </li>
    //     );
    // }
    const additionalElement = (commentId) => {
        return (
            <FaTrashAlt onClick={() => handleDeleteComment()} className='mx-2 text-danger' />
        )
    }

    const dataInfo = [
        { field: 'index', title: '#' },
        { field: 'name', title: 'نام' },
        { field: 'createdAt', title: 'تاریخ' },
        { field: 'email', title: 'ایمیل' },
        { field: 'content', title: 'توضیحات' },
    ]

    const additionalField = {
        title: 'ویرایش',
        elements: (commentId) => additionalElement(commentId)
    }



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

    return (
        <div className='products_main'>
            <div className="container">
                <div className='title'>
                    <h1 className='pt-5 pb-3 fs-1 text-center'>نظرات مقالات</h1>
                </div>
                {/* <div>
                    <div className="my-3 search_box">
                        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className='px-3 py-2 rounded-3' placeholder='جستجو' />
                    </div>
                </div> */}
                {/* <div className='mt-3 table-responsive rounded-4'>
                    <table className="table rounded-4 text-center">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">نام</th>
                                <th scope="col">تاریخ</th>
                                <th scope="col">ایمیل</th>
                                <th scope="col">توضیحات</th>
                                <th scope="col">ویرایش</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                currentItems.map((d, index) => (
                                    <tr key={index}>
                                        <th scope="row">{data.length - indexOfFirstItem - index}</th>
                                        <td>{d.name}</td>
                                        <td className='text-success fw-semibold'>{moment(d.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                        <td className='text-danger fw-semibold'>{d.email}</td>
                                        <td className='w-50'>
                                            <p>{d.content}</p>
                                        </td>
                                        <td>
                                            <FaTrashAlt onClick={() => handleDeleteComment(d._id)} className='mx-2 text-danger' />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div> */}
                <PaginatedTable
                    dataInfo={dataInfo}
                    data={data}
                    additionalField={additionalField}
                />

            </div>
        </div>
    )
}

export default Comments
