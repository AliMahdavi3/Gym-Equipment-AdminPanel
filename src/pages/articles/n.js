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
                <th scope="col">عنوان اول</th>
                <th scope="col">عنوان دوم</th>
                <th scope="col">محتوا اول</th>
                <th scope="col">محتوا دوم</th>
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
                        <p>{d.title_1}</p>
                      </td>
                      <td className='content_table'>
                        <p>{d.title_2}</p>
                      </td>
                      <td className='content_table'>
                        <p>{d.content_1}</p>
                      </td>
                      <td className='content_table'>
                        <p>{d.content_2}</p>
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
// =====================================================================================

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

const AddArticle = ({selectedArticleId}) => {
    const [title_1, setTitle_1] = useState('');
    const [title_2, setTitle_2] = useState('');
    const [content_1, setContent_1] = useState('');
    const [content_2, setContent_2] = useState('');
    const [image, setImage] = useState([]);
    const [author, setAuthor] = useState('');
    

    useEffect(() => {
        if (selectedArticleId) {
            axios.get(`http://localhost:4000/api/article/${selectedArticleId}`).then((res) => {
                const article = res.data.article;
                setTitle_1(article.title_1);
                setTitle_2(article.title_2);
                setContent_1(article.content_1);
                setContent_2(article.content_2);
                setImage(article.image);
                setAuthor(article.author);
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }, [selectedArticleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title_1', title_1);
        formData.append('title_2', title_2);
        formData.append('content_1', content_1);
        formData.append('content_2', content_2);
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
                    text: "!محصول ویرایش شد",
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
                    text: "!محصول ایجاد شد",
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
  return (
    <form className='container w-100' onSubmit={handleSubmit}>
            <div className='modal_fields'>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="title">نام محصول</label>
                    <input value={title_1} onChange={(e) => setTitle_1(e.target.value)} placeholder='نام محصول' id="title" type="text" className='px-3 py-2 rounded-3 w-100' />
                </div>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="title">نام محصول</label>
                    <input value={title_2} onChange={(e) => setTitle_2(e.target.value)} placeholder='نام محصول' id="title" type="text" className='px-3 py-2 rounded-3 w-100' />
                </div>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="content">توضیحات محصول</label>
                    <textarea value={content_1} onChange={(e) => setContent_1(e.target.value)} placeholder='توضیحات محصول' id="content" name="" className='px-3 py-2 rounded-3 w-100'
                        cols="30" rows="10"></textarea>
                </div>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="content">توضیحات محصول</label>
                    <textarea value={content_2} onChange={(e) => setContent_2(e.target.value)} placeholder='توضیحات محصول' id="content" name="" className='px-3 py-2 rounded-3 w-100'
                        cols="30" rows="10"></textarea>
                </div>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="imageUrl">تصویر محصول</label>
                    <input onChange={(e) => setImage(Array.from(e.target.files))} placeholder='تصویر محصول' id="imageUrl" type="file" className='px-3 py-2 rounded-3 w-100' multiple />
                </div>
                <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="productCode">کد محصول</label>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='کد محصول' id="productCode" type="text" className='px-3 py-2 rounded-3 w-100' />
                </div>
            </div>
            <div className="submit_btn mt-3 mb-5">
                <button type='submit' className='btn btn-primary px-3 mx-2'>ذخیره</button>
            </div>
        </form>
  )
}

export default AddArticle
// ====================================================================================

import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Ckeditor = ({placeholder, className, onChange }) => {
    return (
        <div className={className}>
            <CKEditor
                editor={ClassicEditor}
                data={`<p>${placeholder}</p>`}
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) =>
                    editor.getData() === `<p>${placeholder}</p>` ? editor.setData('') : null
                }
            />
        </div>
    )
}

export default Ckeditor
