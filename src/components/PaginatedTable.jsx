import moment from 'moment-jalaali';
import React, { useState } from 'react'
import { FaPlusSquare } from 'react-icons/fa';

const PaginatedTable = ({ dataInfo, data, additionalField, children, handleShowModal }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data
        .filter(
            (d) =>
                dataInfo.some((i) => d[i.field] && d[i.field].includes(searchTerm))
        )
        .slice(0)
        .reverse()
        .slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationLinks = [];

    for (let i = 1; i <= totalPages; i++) {
        paginationLinks.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
            </li>
        );
    }


    return (
        <>
            <div>
                <div className="my-3 search_box">
                    <input onChange={(e) => setSearchTerm(e.target.value)}
                        type="text" className='px-3 py-2 rounded-3' placeholder='جستجو' />
                    {handleShowModal && <FaPlusSquare onClick={() => handleShowModal()} className='fs-1 text-success' />}
                    {children}
                </div>
            </div>
            <div className='mt-3 table-responsive rounded-4'>
                <table className="table rounded-4 text-center">
                    <colgroup>
                        <col style={{ width: "5%" }} />
                        {dataInfo.map((i) => (
                            <col key={i.field} style={{ width: `${100 / (dataInfo.length + (additionalField ? additionalField.length : 0) + 1)}%` }} />
                        ))}
                        {additionalField &&
                            additionalField.map((a, index) => (
                                <col key={a._id + '__' + index} style={{ width: `${100 / (dataInfo.length + additionalField.length + 1)}%` }} />
                            ))}
                    </colgroup>

                    <thead>
                        <tr>
                            <th>#</th>
                            {dataInfo.map((i) => (
                                <th key={i.field} scope="col">{i.title}</th>
                            ))}
                            {
                                additionalField ? additionalField.map((a, index) => (
                                    <th key={a._id + '__' + index}>{a.title}</th>
                                )) : null
                            }
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {currentItems.map((d, index) => (
                            <tr key={d._id}>
                                <td>{index + 1}</td>
                                {dataInfo.map((i) => (
                                    <td className='' key={i.field + '_' + d._id}>
                                        {i.field === 'createdAt'
                                            ? moment(d[i.field]).format('jYYYY/jMM/jDD HH:mm:ss')
                                            : i.field === 'imageUrl'
                                                ? <img src={'https://api.iliyafitness.com/' + d[i.field][0]}
                                                    style={{ maxWidth: "100%", height: "auto" }}
                                                    alt={i.title} className='w-50' />
                                                : i.field === 'content'
                                                    ? <p className='content_table'>{d[i.field]}</p>
                                                    : i.field === 'value' ?
                                                        <p className='content_table' dangerouslySetInnerHTML={{ __html: d[i.field] }}></p>
                                                        : d[i.field]}
                                    </td>
                                ))}
                                {
                                    additionalField ? additionalField.map((a, index) => (
                                        <td key={a._id + '__' + index}>{a.elements(d)}</td>
                                    )) : null
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination mt-2 d-flex justify-content-center align-items-center">
                <nav dir="ltr" aria-label="Page navigation example">
                    <ul className="pagination rounded-3">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {paginationLinks}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default PaginatedTable
