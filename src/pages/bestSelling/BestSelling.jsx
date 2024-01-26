import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import AddBestSelling from './AddBestSelling';
import swal from 'sweetalert';

const BestSelling = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedBestSellingId, setSelectedBestSellingId] = useState('');


  useEffect(() => {
    axios.get('http://localhost:4000/api/bestSellings').then((res) => {
      console.log(res.data.bestSellings);
      setData(res.data.bestSellings)
    }).catch((error) => {
      console.log(error.message);
    })
  }, []);

  const handleShowModal = (bestSellingId, breakpoint) => {
    setFullscreen(breakpoint);
    setSelectedBestSellingId(bestSellingId ? bestSellingId : '');
    console.log(bestSellingId ? bestSellingId : '');
    setShow(true);
  }

  const handleDeleteBestSelling = async (bestSellingId) => {
    await swal({
      title: "آیا از عملیات حذف مطمئن هستید؟",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:4000/api/bestSellings/${bestSellingId}`)
          .then((res) => {
            console.log(res.data);
            setData(data.filter((d) => d._id !== bestSellingId));
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
          <h1 className='pt-4 pb-5 fs-1 text-center'>پرفروشترین محصولات</h1>
        </div>
        <div>
          <div dir='ltr' className="my-3 search_box">
            <FaPlusSquare onClick={() => handleShowModal()} className='fs-1 text-success' />
          </div>
          <Modal show={show} fullscreen={"xxl-down"} onHide={() => setShow(false)}>
            <Modal.Header dir='ltr' className='modal_header container'>
              <Modal.Title>Modal</Modal.Title>
              <FaWindowClose className="close text-danger fs-1" onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
              <AddBestSelling selectedBestSellingId={selectedBestSellingId} />
            </Modal.Body>
          </Modal>
        </div>
        <div className='mt-3 table-responsive rounded-4'>
          <table className="table rounded-4 text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">اسم محصول</th>
                <th scope="col">توضیحات</th>
                <th scope="col">تصویر</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {
                Array.isArray(data) ?
                  data.map((d, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{d.title}</td>
                      <td className='content_table'>
                        <p>{d.content}</p>
                      </td>
                      <td className='w-25'>
                        <img className='w-25' src={'http://localhost:4000/' + d.imageUrl[0]} alt="" />
                      </td>
                      <td>
                        <FaTrashAlt onClick={() => handleDeleteBestSelling(d._id)} className='mx-2 text-danger' />
                        <FaEdit onClick={() => handleShowModal(d._id)} className='mx-2 text-warning' />
                      </td>
                    </tr>
                  )) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BestSelling
