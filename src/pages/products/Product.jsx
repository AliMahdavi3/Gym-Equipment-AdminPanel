import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import AddProduct from './AddProduct';
import swal from 'sweetalert';

const Product = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');


  useEffect(() => {
    axios.get('http://localhost:4000/api/products').then((res) => {
      console.log(res.data.products);
      setData(res.data.products)
    }).catch((error) => {
      console.log(error.message);
    })
  }, []);


  const handleShowModal = (productId, breakpoint) => {
    setFullscreen(breakpoint);
    setSelectedProductId(productId ? productId : '');
    console.log(productId ? productId : '');
    setShow(true);
  }

  const handleDeleteProduct = async (productId) => {
    await swal({
      title: "آیا از عملیات حذف مطمئن هستید؟",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:4000/api/product/${productId}`)
          .then((res) => {
            console.log(res.data);
            setData(data.filter((d) => d._id !== productId));
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
          <h1 className='pt-4 pb-5 fs-1 text-center'>محصولات</h1>
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
              <AddProduct selectedProductId={selectedProductId} />
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
                <th scope="col">عکس محصول</th>
                <th scope="col">دسته بندی</th>
                <th scope="col">کد محصول</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {
                Array.isArray(data) ?
                  data.map((d, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{d.title}</td>
                      <td className='content_table'>
                        <p>{d.content}</p>
                      </td>
                      <td className='w-25'>
                        <img className='w-25' src={'http://localhost:4000/' + d.imageUrl[0]} alt="" />
                      </td>
                      <td>{d.category}</td>
                      <td>{d.productCode}</td>
                      <td>
                        <FaTrashAlt onClick={() => handleDeleteProduct(d._id)} className='mx-2 text-danger' />
                        <FaEdit onClick={() => handleShowModal(d._id)} className='mx-2 text-warning' />
                      </td>
                    </tr>
                  )) : null
              }
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

export default Product
