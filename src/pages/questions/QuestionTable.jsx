import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import PaginatedTable from '../../components/PaginatedTable';
import Actions from './Actions';
import AddQuestion from './AddQuestion';

const QuestionTable = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState('');


    useEffect(() => {
        axios.get('https://api.iliyafitness.com/api/questions').then((res) => {
            setData(res.data.questions)
        }).catch((error) => {
            swal({
                title: "خطایی رخ داده!",
                text: error.message,
                icon: "warning",
                button: "متوجه شدم",
            });        })
    }, []);


    const handleShowModal = (questionId, breakpoint) => {
        setFullscreen(breakpoint);
        setSelectedQuestionId(questionId ? questionId : '');
        setShow(true);
    }

    const handleDeleteQuestion = async (questionId) => {
        await swal({
            title: "آیا از عملیات حذف مطمئن هستید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://api.iliyafitness.com/api/question/${questionId}`)
                    .then((res) => {
                        setData(data.filter((d) => d._id !== questionId));
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
        { field: 'title', title: 'سوال' },
        { field: 'content', title: 'پاسخ' },
    ]

    const additionalField = [
        {
            title: 'ویرایش',
            elements: (rowData) => <Actions
                rowData={rowData}
                handleDeleteQuestion={handleDeleteQuestion}
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
            <AddQuestion
                show={show}
                setShow={setShow}
                selectedQuestionId={selectedQuestionId}
                modalTitle="سوالات"
            />
        </PaginatedTable>
    )
}

export default QuestionTable
