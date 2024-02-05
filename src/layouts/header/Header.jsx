import React from 'react'

const Header = () => {
  return (
    <div className='header'>
      <div className="container py-2 d-flex justify-content-end align-items-center">
        <a href="/" className='a_tag fs-2 fw-bold main_color'>FITNESS</a>
        <img src="/assets/images/gym_logo.png" className='d-none d-md-inline
         rounded-circle py-2 main_bg' alt="" />
        <a href="/" className='a_tag fs-1 fw-bold main_color'>ILIYA</a>
      </div>
    </div>
  )
}

export default Header
