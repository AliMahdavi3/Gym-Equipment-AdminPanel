import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import swal from 'sweetalert';
import AddArticle from './AddArticle';

const Articles = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState('');

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
  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-4 pb-5 fs-1 text-center'>مقالات</h1>
        </div>
        <div>
          <div className="my-3 search_box">
            <input type="text" className='px-3 py-2 rounded-3' placeholder='جستجو' />
            <FaPlusSquare onClick={() => handleShowModal()} className='fs-1 text-success' />
          </div>
          <Modal show={show} fullscreen={"xxl-down"} onHide={() => setShow(false)}>
            <Modal.Header dir='ltr' className='modal_header container'>
              <Modal.Title>Modal</Modal.Title>
              <FaWindowClose className="close text-danger fs-1" onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
              <AddArticle selectedArticleId={selectedArticleId}/>
            </Modal.Body>
          </Modal>
        </div>
        <div className='mt-3 table-responsive rounded-4'>
          <table className="table rounded-4 text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">عنوان</th>
                <th scope="col">محتوا</th>
                <th scope="col">تصویر</th>
                <th scope="col">نویسنده</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {
                Array.isArray(data) ?
                  data.map((d, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td className='content_table'>
                        <p>{d.title}</p>
                      </td>
                      <td className='content_table'>
                        <p>{d.content}</p>
                      </td>
                      <td className='w-25'>
                        <img className='w-25' src={'http://localhost:4000/' + d.imageUrl[0]} alt="" />
                      </td>
                      <td>{d.author}</td>
                      <td>
                        <FaTrashAlt onClick={() => handleDeleteArticle(d._id)} className='mx-2 text-danger' />
                        <FaEdit onClick={() => handleShowModal(d._id)} className='mx-2 text-warning' />
                      </td>
                    </tr>
                  )) : null}
            </tbody>
          </table>
        </div>
        <div className="pagination mt-2 d-flex justify-content-center align-items-center">
          <nav dir='ltr' aria-label="Page navigation example">
            <ul className="pagination rounded-3">
              <li className="page-item">
                <a className="page-link" href="/" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="/">1</a></li>
              <li className="page-item"><a className="page-link" href="/">2</a></li>
              <li className="page-item"><a className="page-link" href="/">3</a></li>
              <li className="page-item">
                <a className="page-link" href="/" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Articles
