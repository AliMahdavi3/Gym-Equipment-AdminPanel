import React from 'react'
import ArticlesTable from './ArticlesTable';

const Articles = () => {
  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-4 pb-5 fs-1 text-center'>مقالات</h1>
        </div>
        <ArticlesTable />
      </div>
    </div>
  )
}

export default Articles
