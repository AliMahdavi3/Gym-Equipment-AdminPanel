import React from 'react'
import BestSellingTable from './BestSellingTable';

const BestSelling = () => {
  


  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-5 pb-3 fs-1 text-center'>پرفروشترین محصولات</h1>
        </div>
       <BestSellingTable/>
      </div>
    </div>

  )
}

export default BestSelling
