import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const Books = () => {

    const [bookList, setBookList] = useState([])
    const [newBook, setNewBook] = useState({})
    const [searchBook, setSearchBook] = useState('')
    const [isModal, setIsModal] = useState(false)

    useEffect(() => {
        fetchBook()
    }, [])

    const fetchBook = useCallback(
        async () => {
            try {
                const response = await axios.get('http://localhost:8080/books')
                Swal.fire({
                    icon: 'success',
                    titleText: 'Books Fetched Successfully'
                })
                setBookList(response.data)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    titleText: error.message
                })
            }
        },
        [],
    )


    const addNewBookHandler = useCallback(
        async (e) => {
            e.preventDefault()

            try {
                const response = await axios.post('http://localhost:8080/books', { ...newBook })
                setBookList(response.data)
                setNewBook({})
                setIsModal(false)
                Swal.fire({
                    icon: 'success',
                    titleText: 'Book Added Successfully'
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    titleText: error.message
                })
            }
        },
        [newBook],
    )

    const searchBookHandler = useCallback(
        async (e) => {
            e.preventDefault()

            try {
                const response = await axios.get(`http://localhost:8080/books/${searchBook}`)
                console.log(response.data);
                setBookList(response.data)
                Swal.fire({
                    icon: 'success',
                    titleText: 'Book Found'
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    titleText: error.message
                })
            }
        },
        [searchBook],
    )



    return (
        <div className='container mt-5'>

            {/* search book */}
            <h3>Search Book</h3>
            <form className="row g-3" onSubmit={searchBookHandler}>
                <div className="col-auto">
                    {/* <label for="inputPassword2" className="visually-hidden">Password</label> */}
                    <input
                        type="text"
                        className="form-control" id="searchBook"
                        onChange={(e) => setSearchBook(e.target.value)}
                        placeholder="Search Book" />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Search</button>
                </div>
            </form>
            {/* getBooks */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3>Books List</h3>
                <button type="button" className='btn btn-primary btn-sm' onClick={() => setIsModal(true)}>Add New Book</button>

            </div>


            <div className='row'>
                {bookList.length > 0 ? (
                    bookList.map((b, i) => (

                        <div className='col-sm-12 col-md-4 col-lg-4' key={i}>
                            <div className="card mb-4" style={{ "width": "24rem" }}>
                                <div className="card-header">
                                    {b.title}
                                </div>
                                <div className="card-body">
                                    {b.shortDescription}
                                </div>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Author : {b.author}</li>
                                    <li className="list-group-item">Year: {b.year}</li>
                                </ul>
                            </div>
                        </div>

                    ))

                ) : (
                    <p className="text-muted">No Books Found</p>
                )}
            </div>


            {isModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }} onClick={() => setIsModal(false)}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Book</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={addNewBookHandler}>
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                        placeholder='Book title'
                                        onChange={(e) => setNewBook((prev) => ({ ...prev, title: e.target.value }))}
                                    />
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                        placeholder='Book Description'
                                        onChange={(e) => setNewBook((prev) => ({ ...prev, shortDescription: e.target.value }))}
                                    />
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                        placeholder='Book year'
                                        onChange={(e) => setNewBook((prev) => ({ ...prev, year: e.target.value }))}
                                    />
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                        placeholder='Book Author'
                                        onChange={(e) => setNewBook((prev) => ({ ...prev, author: e.target.value }))}
                                    />
                                    <button type="submit" className='btn btn-primary'>Add Book</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Books