import React from 'react'
import { createPortal } from 'react-dom'
import Modal from 'react-bootstrap/Modal';
import { FaWindowClose } from 'react-icons/fa';

const ModalContainer = ({ children, show, setShow, modalTitle }) => {
    return createPortal(
        <Modal show={show} fullscreen={"xxl-down"} onHide={() => setShow(false)}>
            <Modal.Header dir='ltr' className='modal_header container'>
                <Modal.Title>{modalTitle}</Modal.Title>
                <FaWindowClose className="close text-danger fs-1" onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
        , document.getElementById('modal-root')
    )
}

export default ModalContainer
