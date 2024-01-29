import React from 'react'
import EquippedGymTable from './EquippedGymTable';

const EquippedGym = () => {
  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-4 pb-5 fs-1 text-center'>باشگاه های تجهیز شده</h1>
        </div>
        <EquippedGymTable />
      </div>
    </div>
  )
}

export default EquippedGym
