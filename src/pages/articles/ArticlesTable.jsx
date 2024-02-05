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
            axios.get(`https://api.iliyafitness.com/api/article/${selectedArticleId}`).then((res) => {
                const article = res.data.article
            }).catch((error) => {
                swal({
                    title: "خطایی رخ داده!",
                    text: error.message,
                    icon: "warning",
                    button: "متوجه شدم",
                });
            })
        }
    }, [selectedArticleId]);

    useEffect(() => {
        axios.get('https://api.iliyafitness.com/api/articles').then((res) => {
            setData(res.data.articles);
        }).catch((error) => {
            swal({
                title: "خطایی رخ داده!",
                text: error.message,
                icon: "warning",
                button: "متوجه شدم",
            });
        })
    }, []);


    const handleShowModal = (articleId, breakpoint) => {
        setFullscreen(breakpoint);
        setSelectedArticleId(articleId ? articleId : '');
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
                axios.delete(`https://api.iliyafitness.com/api/article/${articleId}`)
                    .then((res) => {
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
