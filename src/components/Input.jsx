import { ErrorMessage, FastField } from 'formik'
import React from 'react'

const Input = ({label, type, placeholder, name, formik}) => {
    return (
        <div className='w-100 my-3' dir='rtl'>
            <div>
                <label className='mb-3 fw-bold' htmlFor={name}>{label}</label>
            </div>
            <FastField className={`form-control rounded-5 py-2 px-3 fw-semibold
            ${formik.errors[name] && formik.touched[name] ? "border_error" : null}`}
            name={name} type={type} placeholder={placeholder} />
            <div className='mt-2 text-danger'>
                <ErrorMessage name={name}/>
            </div>
        </div>
    )
}

export default Input
