import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import moment from 'moment-jalaali';
import axios from 'axios';
import swal from 'sweetalert';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:4000/api/sendMessages').then((res) => {
      console.log(res.data.sendMessages);
      setData(res.data.sendMessages)
    }).catch((error) => {
      console.log(error.message);
    })
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter(
      (d) =>
        d.name.includes(searchTerm) ||
        d.phoneNumber.includes(searchTerm) ||
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



  const handleDeleteQuestion = async (messageId) => {
    await swal({
      title: "آیا از عملیات حذف مطمئن هستید؟",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:4000/api/sendMessage/${messageId}`)
          .then((res) => {
            console.log(res.data);
            setData(data.filter((d) => d._id !== messageId));
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
          <h1 className='pt-5 pb-3 fs-1 text-center'>پیام ها</h1>
        </div>
        <div>
          <div className="my-3 search_box">
            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className='px-3 py-2 rounded-3' placeholder='جستجو' />
          </div>
        </div>
        <div className='mt-3 table-responsive rounded-4'>
          <table className="table rounded-4 text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">نام</th>
                <th scope="col">تاریخ</th>
                <th scope="col">شماره تلفن</th>
                <th scope="col">توضیحات</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {currentItems.map((d, index) => (
                <tr key={index}>
                  <th scope="row">{data.length - indexOfFirstItem - index}</th>
                  <td>{d.name}</td>
                  <td className='text-success fw-semibold'>{moment(d.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                  <td className='text-danger fw-semibold'>{d.phoneNumber}</td>
                  <td className='w-50'>
                    <p>{d.content}</p>
                  </td>
                  <td>
                    <FaTrashAlt onClick={() => handleDeleteQuestion(d._id)} className='mx-2 text-danger' />
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

export default Dashboard
