import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Actions = ({rowData, handleDeleteComment}) => {
    return (
        <>
            <FaTrashAlt onClick={() => handleDeleteComment(rowData._id)} className='mx-2 text-danger' />
        </>
    )
}

export default Actions
