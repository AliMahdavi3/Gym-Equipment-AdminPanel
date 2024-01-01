import React from 'react'

const Links = ({ icon, link, title }) => {
  return (
    <li><a className='a_tag fw-medium text-light d-flex justify-content-between align-items-center'
      href={link}>{title} {icon && React.cloneElement(icon, { className: 'list_icons text-secondary my-3 fs-2' })}
    </a></li>
  )
}

export default Links
