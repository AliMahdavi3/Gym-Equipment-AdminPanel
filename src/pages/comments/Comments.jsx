import React from 'react'
import CommentTable from './CommentTable'

const Comments = () => {
    return (
        <div className='products_main'>
            <div className="container">
                <div className='title'>
                    <h1 className='pt-5 pb-3 fs-1 text-center'>نظرات مقالات</h1>
                </div>
                <CommentTable />
            </div>
        </div>
    )
}

export default Comments
