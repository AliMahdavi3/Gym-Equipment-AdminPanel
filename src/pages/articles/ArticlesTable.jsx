import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import PaginatedTable from '../../components/PaginatedTable';
import Actions from './Actions';
import AddArticle from './AddArticle';

const ArticlesTable = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [selectedArticleId, setSelectedArticleId] = useState('');


    useEffect(() => {
        if (selectedArticleId) {
            axios.get(`http://localhost:4000/api/article/${selectedArticleId}`).then((res) => {
                const article = res.data.article
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }, [selectedArticleId]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/articles').then((res) => {
            console.log(res.data.articles);
            setData(res.data.articles);
        }).catch((error) => {
            console.log(error.message);
        })
    }, []);


    const handleShowModal = (articleId, breakpoint) => {
        setFullscreen(breakpoint);
        setSelectedArticleId(articleId ? articleId : '');
        console.log(articleId ? articleId : '');
        setShow(true);
    }



    const handleDeleteArticle = async (articleId) => {
        await swal({
            title: "آیا از عملیات حذف مطمئن هستید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:4000/api/article/${articleId}`)
                    .then((res) => {
                        console.log(res.data);
                        setData(data.filter((d) => d._id !== articleId));
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
        { field: 'value', title: 'توضیحات' },
        { field: 'imageUrl', title: 'تصویر' },
        { field: 'author', title: 'تصویر' },
    ]

    const additionalField = [
        {
            title: 'ویرایش',
            elements: (rowData) => <Actions
                rowData={rowData}
                handleDeleteArticle={handleDeleteArticle}
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
            <AddArticle
                show={show}
                setShow={setShow}
                selectedArticleId={selectedArticleId}
                modalTitle="مقالات"
            />
        </PaginatedTable>
    )
}

export default ArticlesTable