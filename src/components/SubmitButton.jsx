import React from 'react'

const SubmitButton = ({isSubmitting}) => {
    return (
        <div className="submit_btn mt-3 mb-5">
            <button type='submit'
                className='btn btn-primary px-3 mx-2' disabled={isSubmitting}>
                {isSubmitting ? 'لطفا صبر کنید...' : 'ذخیره'}</button>
        </div>
    )
}

export default SubmitButton
