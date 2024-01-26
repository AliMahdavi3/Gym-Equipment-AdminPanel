import React, { useState } from 'react'

const PaginatedTable = ({ dataInfo, data, additionalField }) => {
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
                    <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className='px-3 py-2 rounded-3' placeholder='جستجو' />
                </div>
            </div>
            <div className='mt-3 table-responsive rounded-4'>
                <table className="table rounded-4 text-center">
                    <thead>
                        <tr>
                            {dataInfo.map((i) => (
                                <th key={i.field} scope="col">{i.title}</th>
                            ))}
                            {
                                additionalField ? (
                                    <th>{additionalField.title}</th>
                                ) : null
                            }
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {currentItems.map((d) => (
                            <tr>
                                {dataInfo.map((i) => (
                                    <td key={i.field + '_' + d._id} >{d[i.field]}</td>
                                ))}
                                {
                                    additionalField ? (
                                        <td>{additionalField.elements(d._id)}</td>
                                    ) : null
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
