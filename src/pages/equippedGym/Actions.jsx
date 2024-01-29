import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

const Actions = ({rowData, handleDeleteEquippedGym, handleShowModal}) => {
    return (
        <>
            <FaTrashAlt onClick={() => handleDeleteEquippedGym(rowData._id)} className='mx-2 text-danger' />
            <FaEdit onClick={() => handleShowModal(rowData._id)} className='mx-2 text-warning' />
        </>
    )
}

export default Actions
