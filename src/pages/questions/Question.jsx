import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import swal from 'sweetalert';
import AddQuestion from './AddQuestion';


const Question = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:4000/api/questions').then((res) => {
      console.log(res.data.questions);
      setData(res.data.questions)
    }).catch((error) => {
      console.log(error.message);
    })
  }, []);


  const handleShowModal = (questionId, breakpoint) => {
    setFullscreen(breakpoint);
    setSelectedQuestionId(questionId ? questionId : '');
    console.log(questionId ? questionId : '');
    setShow(true);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter(
      (d) =>
        d.title.includes(searchTerm) ||
        d.content.includes(searchTerm)
    )
    .slice(0)
    .reverse()
    .slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginationLinks = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(
      <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
      </li>
    );
  }


  const handleDeleteQuestion = async (questionId) => {
    await swal({
      title: "آیا از عملیات حذف مطمئن هستید؟",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:4000/api/question/${questionId}`)
          .then((res) => {
            console.log(res.data);
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

  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-4 pb-5 fs-1 text-center'>سوالات پرتکرار</h1>
        </div>
        <div>
          <div className="my-3 search_box">
            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className='px-3 py-2 rounded-3' placeholder='جستجو' />
            <FaPlusSquare onClick={() => handleShowModal()} className='fs-1 text-success' />
          </div>
          <Modal show={show} fullscreen={"xxl-down"} onHide={() => setShow(false)}>
            <Modal.Header dir='ltr' className='modal_header container'>
              <Modal.Title>Modal</Modal.Title>
              <FaWindowClose className="close text-danger fs-1" onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
              <AddQuestion selectedQuestionId={selectedQuestionId} />
            </Modal.Body>
          </Modal>
        </div>
        <div className='mt-3 table-responsive rounded-4'>
          <table className="table rounded-4 text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">نام محصول</th>
                <th scope="col">توضیحات</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {
                currentItems.map((d, index) => (
                  <tr key={index}>
                    <th scope="row">{data.length - indexOfFirstItem - index}</th>
                    <td>{d.title}</td>
                    <td className='content_table'>
                      <p>{d.content}</p>
                    </td>
                    <td>
                      <FaTrashAlt onClick={() => handleDeleteQuestion(d._id)} className='mx-2 text-danger' />
                      <FaEdit onClick={() => handleShowModal(d._id)} className='mx-2 text-warning' />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="pagination mt-2 d-flex justify-content-center align-items-center">
          <nav dir="ltr" aria-label="Page navigation example">
            <ul className="pagination rounded-3">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {paginationLinks}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Question