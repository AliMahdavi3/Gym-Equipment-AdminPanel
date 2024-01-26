import React, { useState } from 'react'
import {
  FaDollyFlatbed,
  FaComments,
  FaBars,
  FaQuestion,
  FaRegTimesCircle,
  FaRegFileAlt,
  FaDonate,
  FaTachometerAlt,
  FaPeopleCarry
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Links from './Links';


const SideBar = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleSideBar = () => {
    setActive(!active);
  }

  const loginToken = JSON.parse(localStorage.getItem('Token'));

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate('/login');
    window.location.reload();
  }

  return (
    <div className={`sidebar ${active ? "active" : ''}`}>
      <div className='menu_btn pb-2'>
        {
          active ? (
            <button onClick={handleSideBar} className='px-2 py-2 rounded-3'>
              <FaRegTimesCircle className='fs-2 text-danger' />
            </button>
          ) : (
            <button onClick={handleSideBar} className='px-2 py-2 rounded-3'>
              <FaBars className='fs-2 text-info' />
            </button>
          )
        }

      </div>
      <div className='w-100 mt-5  pt-2 d-flex justify-content-center align-items-center'>
        <h3 className='text-center profile_image'>پنل مدیریت</h3>
      </div>
      <div className='mt-3 d-flex list_links justify-content-center align-items-start flex-column'>
        <ul className='list-unstyled'>
          <Links icon={<FaTachometerAlt />} title="داشبورد" link="/" />
          <Links icon={<FaDollyFlatbed />} title="محصولات" link="/product" />
          <Links icon={<FaRegFileAlt />} title="مقالات" link="/articles" />
          <Links icon={<FaDonate />} title="محصولات پرفروش" link="/bestSelling" />
          <Links icon={<FaPeopleCarry />} title="باشگاه تجهیزشده" link="/equippedGym" />
          <Links icon={<FaQuestion />} title="سوالات پرتکرار" link="/question" />
          <Links icon={<FaComments />} title="نظرات مقالات" link="/comments" />
        </ul>
      </div>
      <div className='d-flex justify-content-center pb-5 align-items-center'>
        {
          loginToken ? (
            <button onClick={handleLogout} className='a_tag btn btn-warning pb-2 px-5 fw-semibold rounded-5 mx-3'>خروج</button>
          ) : (
            <button className='a_tag btn btn-warning pb-2 px-5 fw-semibold rounded-5 mx-3'>ورود</button>
          )
        }
      </div>
    </div>
  )
}

export default SideBar
