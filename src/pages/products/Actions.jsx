import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

const Actions = ({rowData, handleDeleteProduct, handleShowModal}) => {
    return (
        <>
            <FaTrashAlt onClick={() => handleDeleteProduct(rowData._id)} className='mx-2 text-danger' />
            <FaEdit onClick={() => handleShowModal(rowData._id)} className='mx-2 text-warning' />
        </>
    )
}

export default Actions
