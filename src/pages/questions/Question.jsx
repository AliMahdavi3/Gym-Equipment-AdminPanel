import React from 'react'
import QuestionTable from './QuestionTable';


const Question = () => {
  return (
    <div className='products_main'>
      <div className="container">
        <div className='title'>
          <h1 className='pt-4 pb-5 fs-1 text-center'>سوالات پرتکرار</h1>
        </div>
        <QuestionTable />
      </div>
    </div>
  )
}

export default Question
