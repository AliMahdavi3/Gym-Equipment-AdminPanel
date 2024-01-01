import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaDollyFlatbed, FaBars, FaRegTimesCircle, FaRegFileAlt, FaDonate, FaTachometerAlt, FaPeopleCarry } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import Links from './Links';


const SideBar = () => {
  const [active, setActive] = useState(false);
  const handleSideBar = () => {
    setActive(!active);
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
      <div className='w-100 profile_image mt-5 d-flex justify-content-center align-items-center'>
        <img className='w-25 rounded-circle' src="/assets/images/avatar.png" alt="" />
      </div>
      <div className='mt-4 d-flex list_links justify-content-center align-items-start flex-column'>
        <ul className='list-unstyled'>
          <Links icon={<FaTachometerAlt />} title="داشبورد" link="/" />
          <Links icon={<FaDollyFlatbed />} title="محصولات" link="/product" />
          <Links icon={<FaRegFileAlt />} title="مقالات" link="/articles" />
          <Links icon={<FaDonate />} title="محصولات پرفروش" link="/bestSelling" />
          <Links icon={<FaPeopleCarry />} title="باشگاه تجهیزشده" link="/equippedGym" />
        </ul>
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <a className='a_tag btn btn-warning pb-2 px-5 fw-semibold rounded-5 mx-3' href="/">ورود</a>
      </div>
    </div>
  )
}

export default SideBar
