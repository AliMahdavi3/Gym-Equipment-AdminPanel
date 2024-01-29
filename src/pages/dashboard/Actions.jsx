import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Actions = ({rowData, handleDeleteQuestion}) => {
    return (
        <>
            <FaTrashAlt onClick={() => handleDeleteQuestion(rowData._id)} className='mx-2 text-danger' />
        </>
    )
}

export default Actions
