import React from 'react'
import ProductTable from './ProductTable';

const Product = () => {
  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-4 pb-5 fs-1 text-center'>محصولات</h1>
        </div>
        <ProductTable/>
      </div>
    </div>
  )
}

export default Product
