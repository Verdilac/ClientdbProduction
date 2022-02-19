import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import '../App.css';
import BookDataService from "../Util/BookDataContext"

const BooksList = ({ getBookId }) => {

    // State to store all book records as an array
    const [books, setBooks] = useState([]);

    // 1) Fetch all books as the page is loaded (run only once)
    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        const data = await BookDataService.getAllBooks();
        console.log(data.docs);
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // 2) Delete Handler to delete a record
    const deleteHandler = async (id) => {
        await BookDataService.deleteBook(id);
        getBooks();  // refresh after delete
    };

    return (
        <>
            {/* -------------- Refresh Btn START -------------- */}
            <div className="mb-2">
                <Button variant="dark edit" onClick={getBooks}>
                    Refresh List
                </Button>
            </div>
            {/* -------------- Refresh Btn END -------------- */}

            {/* -------------- Table START -------------- */}
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Des</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>House No</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>District</th>
                        <th>Postal Code</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((doc, index) => {
                        return (
                            <tr key={doc.id}>
                                <td>{index + 1}</td>
                                <td>{doc.name}</td>
                                <td>{doc.description}</td>
                                <td>{doc.category}</td>
                                <td>{doc.subCategory}</td>
                                <td>{doc.contact}</td>
                                <td>{doc.email}</td>
                                <td>{doc.houseNo}</td>
                                <td>{doc.street}</td>
                                <td>{doc.city}</td>
                                <td>{doc.district}</td>
                                <td>{doc.postalCode}</td>
                                <td>{doc.country}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        className="edit"
                                        onClick={(e) => getBookId(doc.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="delete"
                                        onClick={(e) => deleteHandler(doc.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {/* -------------- Table END -------------- */}
        </>
    );
};

export default BooksList;