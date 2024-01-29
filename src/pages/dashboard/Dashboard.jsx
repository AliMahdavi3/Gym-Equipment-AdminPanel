import React from 'react'
import DashboardTable from './DashboardTable';

const Dashboard = () => {
  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-5 pb-3 fs-1 text-center'>پیام ها</h1>
        </div>
        <DashboardTable/>
      </div>
    </div>
  )
}

export default Dashboard
