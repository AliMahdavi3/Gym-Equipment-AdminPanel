import React, { useState } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';

const EquippedGym = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-4 pb-5 fs-1 text-center'>باشگاه های تجهیز شده</h1>
        </div>
        <div>
          <div className="my-3 search_box">
            <input type="text" className='px-3 py-2 rounded-3' placeholder='جستجو' />
            <FaPlusSquare onClick={() => handleShow()} className='fs-1 text-success' />
          </div>
          <Modal show={show} fullscreen={"xxl-down"} onHide={() => setShow(false)}>
            <Modal.Header dir='ltr' className='modal_header container'>
              <Modal.Title>Modal</Modal.Title>
              <FaWindowClose className="close text-danger fs-1" onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
              <form className='container w-100'>
                <div className='modal_fields'>

                  <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="title_2">اسم باشگاه</label>
                    <input placeholder='اسم محصول' type="text" className='px-3 py-2 rounded-3 w-100' />
                  </div>
                  <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="content-2">توضیحات</label>
                    <textarea placeholder='توضیحات' name="" className='px-3 py-2 rounded-3 w-100' id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="content-2">آدرس</label>
                    <textarea placeholder='آدرس' name="" className='px-3 py-2 rounded-3 w-100' id="" cols="30" rows="5"></textarea>
                  </div>
                  <div className='d-flex flex-column mb-3 justify-content-start align-items-start'>
                    <label className='mb-2 fw-semibold' htmlFor="imageUrl">تصاویر</label>
                    <input placeholder='تصویر' type="file" className='px-3 py-2 rounded-3 w-100' />
                  </div>
                </div>
                <div className="submit_btn mt-5 mb-5">
                  <button className='btn btn-primary px-3 mx-2'>ذخیره</button>
                  <button className='btn btn-danger px-3 mx-2'>انصراف</button>
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
                <th scope="col">اسم باشگاه</th>
                <th scope="col">توضیحات</th>
                <th scope="col">آدرس</th>
                <th scope="col">تصاویر</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td className='content_table'>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
                </td>
                <td className='content_table'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi optio a voluptas dolorum quam laborum dicta, beatae deserunt quo minima!</p>
                </td>
                <td>@mdo</td>
                <td>
                  <FaTrashAlt className='mx-2 text-danger' />
                  <FaEdit className='mx-2 text-warning' />
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td className='content_table'>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
                </td>
                <td className='content_table'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi optio a voluptas dolorum quam laborum dicta, beatae deserunt quo minima!</p>
                </td>
                <td>@fat</td>
                <td>
                  <FaTrashAlt className='mx-2 text-danger' />
                  <FaEdit className='mx-2 text-warning' />
                </td>
              </tr>
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

export default EquippedGym
