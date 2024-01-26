import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import swal from 'sweetalert';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Articles = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState([]);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (selectedArticleId) {
      axios.get(`http://localhost:4000/api/article/${selectedArticleId}`).then((res) => {
        const article = res.data.article;
        setTitle(article.title);
        setValue(article.value);
        setImage(article.image);
        setAuthor(article.author);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('value', value);
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i]);
    }
    formData.append('author', author);

    try {
      if (selectedArticleId) {
        const res = await axios.put(`http://localhost:4000/api/article/${selectedArticleId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        swal({
          title: "عملیات موفقیت آمیز بود",
          text: "!مقاله ویرایش شد",
          icon: "success",
          button: "متوجه شدم",
        }).then(() => {
          window.location.reload()
        });
        console.log(res.data);
      } else {
        const res = await axios.post('http://localhost:4000/api/article', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        swal({
          title: "عملیات موفقیت آمیز بود",
          text: "!مقاله ایجاد شد",
          icon: "success",
          button: "متوجه شدم",
        }).then(() => {
          window.location.reload()
        });
        console.log(res.data);
      }
    } catch (error) {
      swal({
        title: "خطایی رخ داده!",
        text: error.message,
        icon: "warning",
        button: "متوجه شدم",
      });
      console.log(error.message);
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
    ],
  }

  const handleShowModal = (articleId, breakpoint) => {
    setFullscreen(breakpoint);
    setSelectedArticleId(articleId ? articleId : '');
    console.log(articleId ? articleId : '');
    setShow(true);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter(
      (d) =>
        d.title.includes(searchTerm) ||
        d.value.includes(searchTerm) ||
        d.author.includes(searchTerm)
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
            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className='px-3 py-2 rounded-3' placeholder='جستجو' />
            <FaPlusSquare onClick={() => handleShowModal()} className='fs-1 text-success' />
          </div>
          <Modal show={show} fullscreen={"xxl-down"} onHide={() => setShow(false)}>
            <Modal.Header dir='ltr' className='modal_header container'>
              <Modal.Title>Modal</Modal.Title>
              <FaWindowClose className="close text-danger fs-1" onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
              <form className='container w-100' onSubmit={handleSubmit}>
                <div className='modal_fields'>
                  <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="title">موضوع مقاله</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='موضوع مقاله' id="title" type="text" className='px-3 py-2 rounded-3 w-100' />
                  </div>
                  <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="content">محتوا</label>
                    <ReactQuill className='w-100' theme="snow" modules={modules} value={value}
                      onChange={setValue} />
                  </div>
                  <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="imageUrl">تصویر</label>
                    <input onChange={(e) => setImage(Array.from(e.target.files))} placeholder='تصویر' id="imageUrl" type="file" className='px-3 py-2 rounded-3 w-100' multiple />
                  </div>
                  <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="productCode">نویسنده</label>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='نویسنده' id="productCode" type="text" className='px-3 py-2 rounded-3 w-100' />
                  </div>
                </div>
                <div className="submit_btn mt-3 mb-5">
                  <button type='submit' className='btn btn-primary px-3 mx-2'>ذخیره</button>
                </div>
              </form>
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
                currentItems.map((d, index) => (
                  <tr>
                    <th scope="row">{data.length - indexOfFirstItem - index}</th>
                    <td className='content_table'>
                      <p>{d.title}</p>
                    </td>
                    <td dangerouslySetInnerHTML={{ __html: d.value }} className='content_table'>

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
                ))}
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

export default Articles
