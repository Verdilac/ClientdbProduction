import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Container } from "react-bootstrap";
import '../App.css';
import BookDataService from "../Util/BookDataContext";

// Imports from MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


const BooksList = ({ getBookId }) => {

    // State to store all book records as an array
    const [books, setBooks] = useState([]);

    // States
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");


    //Filter States
    const [companyName, setcompanyName] = useState("");
    const [country, setcountry] = useState("");
    const [city, setcity] = useState("");
    const [district, setdistrict] = useState("");
    const [street, setstreet] = useState("");
   const [postalCode, setpostalCode] = useState("")
   const [lastDoc, setlastDoc] = useState();

   


    //Filter Functions
    const Filter = async () => {
      //console.log(companyName,country,city,district,street,postalCode,category,subCategory);



        const data = await BookDataService.Filter(companyName,country,city,district,street,postalCode,category,subCategory);
        console.log(data.docs);
        setlastDoc(data.docs[data.docs.length-1])
        console.log("LAST DOC ",lastDoc)
 
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const LoadMore = async () => {
        const data = await BookDataService.GetNext(companyName,country,city,district,street,postalCode,category,subCategory,lastDoc);
        setlastDoc(data.docs[data.docs.length-1])
        //setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setBooks((books)=>[...books,...data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))])
    }


    // 1) Fetch all books as the page is loaded (run only once)
    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        
        const data = await BookDataService.getAllBooks();
        setlastDoc(data.docs[data.docs.length-1])
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
            {/* ------------------- Fiter START -------------------- */}
            <Container>
                <Form className='rounded p-4 p-sm-4 border'>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Company Name"
                                onChange={(e)=> {setcompanyName(e.target.value)}}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                onChange={(e)=> {setcountry(e.target.value)}}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                onChange={(e)=> {setcity(e.target.value)}}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="District"
                                onChange={(e)=> {setdistrict(e.target.value)}}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Street"
                                onChange={(e)=> {setstreet(e.target.value)}}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Postal Code"
                                onChange={(e)=> {setpostalCode(e.target.value)}}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        {/* ------------ Main Dropdown START ------------ */}
                        <Col>
                            <FormControl fullWidth className="mt-1">
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={(e) => { setCategory(e.target.value) }}
                                >
                                    <MenuItem value={"Eat"} >Eat</MenuItem>
                                    <MenuItem value={"Goods"}>Goods</MenuItem>
                                    <MenuItem value={"Repair and Construction"}>Repair and Construction</MenuItem>
                                    <MenuItem value={"Car Service"}>Car Service</MenuItem>
                                    <MenuItem value={"Medicine"}>Medicine</MenuItem>
                                    <MenuItem value={"Auto Goods"}>Auto Goods</MenuItem>
                                    <MenuItem value={"Beauty"}>Beauty</MenuItem>
                                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                                    <MenuItem value={"Sports"}>Sports</MenuItem>
                                    <MenuItem value={"Services"}>Services</MenuItem>
                                    <MenuItem value={"Special Stores"}>Special Stores</MenuItem>
                                    <MenuItem value={"Tourism"}>Tourism</MenuItem>
                                    <MenuItem value={"Products"}>Products</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        {/* ------------ Main Dropdown END ------------ */}

                        {/* ------------ Sub Dropdown START ------------ */}
                        <Col>
                            <FormControl fullWidth className="mt-1">
                                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                {
                                    category === "Eat" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Coffee Shops"}>Coffee Shops</MenuItem>
                                        <MenuItem value={"Pubs"}>Pubs</MenuItem>
                                        <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
                                        <MenuItem value={"Bar"}>Bar</MenuItem>
                                        <MenuItem value={"Bakeries"}>Bakeries</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Goods" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Grocery Shops"}>Grocery Shops</MenuItem>
                                        <MenuItem value={"Supermarket"}>Supermarket</MenuItem>
                                        <MenuItem value={"Stationary"}>Stationary</MenuItem>
                                        <MenuItem value={"Pet Shops"}>Pet Shops</MenuItem>
                                        <MenuItem value={"For Homes"}>For Homes</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Repair and Construction" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Decoration material"}>Decoration material</MenuItem>
                                        <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                        <MenuItem value={"Tool"}>Tool</MenuItem>
                                        <MenuItem value={"Services"}>Services</MenuItem>
                                        <MenuItem value={"Building Materials"}>Building Materials</MenuItem>
                                        <MenuItem value={"Windows"}>Windows</MenuItem>
                                        <MenuItem value={"Door"}>Door</MenuItem>
                                        <MenuItem value={"Roof"}>Roof</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Car Service" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Car Repair"}>Car Repair</MenuItem>
                                        <MenuItem value={"Car Washes"}>Car Washes</MenuItem>
                                        <MenuItem value={"Tire Fitting"}>Tire Fitting</MenuItem>
                                        <MenuItem value={"Refueling"}>Refueling</MenuItem>
                                        <MenuItem value={"Auto Disassembly"}>Auto Disassembly</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Medicine" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Pharmacies"}>Pharmacies</MenuItem>
                                        <MenuItem value={"Hospital"}>Hospital</MenuItem>
                                        <MenuItem value={"Dispensary"}>Dispensary</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select> : category === "Auto Goods" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Car Batteries"}>Car Batteries</MenuItem>
                                        <MenuItem value={"Tyres and Wheels"}>Tyres and Wheels</MenuItem>
                                        <MenuItem value={"Oil & Car Chemicals"}>Oil & Car Chemicals</MenuItem>
                                        <MenuItem value={"Motor Transport"}>Motor Transport</MenuItem>
                                        <MenuItem value={"Spare Parts"}>Spare Parts</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Beauty" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Hairdressers"}>Hairdressers</MenuItem>
                                        <MenuItem value={"Cosmetologist"}>Cosmetologist</MenuItem>
                                        <MenuItem value={"Manicure and Pedicure"}>Manicure and Pedicure</MenuItem>
                                        <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
                                        <MenuItem value={"Solariums"}>Solariums</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Entertainment" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Clubs"}>Clubs</MenuItem>
                                        <MenuItem value={"Night Clubs"}>Night Clubs</MenuItem>
                                        <MenuItem value={"Saunas"}>Saunas</MenuItem>
                                        <MenuItem value={"Baths"}>Baths</MenuItem>
                                        <MenuItem value={"Cinemas"}>Cinemas</MenuItem>
                                        <MenuItem value={"Amusement"}>Amusement</MenuItem>
                                        <MenuItem value={"Children Playrooms"}>Children Playrooms</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Sports" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Gym"}>Gym</MenuItem>
                                        <MenuItem value={"Fitness Centers"}>Fitness Centers</MenuItem>
                                        <MenuItem value={"Sections"}>Sections</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select> : category === "Special Stores" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Furniture"}>Furniture</MenuItem>
                                        <MenuItem value={"Flowers"}>Flowers</MenuItem>
                                        <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                        <MenuItem value={"Clothes"}>Clothes</MenuItem>
                                        <MenuItem value={"Shoes"}>Shoes</MenuItem>
                                        <MenuItem value={"Souvenirs"}>Souvenirs</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Tourism" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Hotels"}>Hotels</MenuItem>
                                        <MenuItem value={"Apartment Offices"}>Apartment Offices</MenuItem>
                                        <MenuItem value={"Travel Agencies"}>Travel Agencies</MenuItem>
                                        <MenuItem value={"Hostels"}>Hostels</MenuItem>
                                        <MenuItem value={"Recreation Centers"}>Recreation Centers</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Fish"}>Fish</MenuItem>
                                        <MenuItem value={"Meat"}>Meat</MenuItem>
                                        <MenuItem value={"Drinks"}>Drinks</MenuItem>
                                        <MenuItem value={"Confectionery"}>Confectionery</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select>
                                }
                            </FormControl>

                        </Col>
                        {/* ------------ Sub Dropdown END ------------ */}
                    </Row>
                    <Row className='mt-3'>
                        <Col className="d-grid gap-2">
                            <Button variant="success" type="button" onClick={(e)=>{Filter()}}>
                                Filter
                            </Button>
                        </Col>

                    </Row>
                </Form>
            </Container>
            {/* ------------------- Fiter END -------------------- */}



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
            <Button
                                        variant="success"
                                        onClick={(e) => LoadMore()}
                                    >
                                        Load More
                                    </Button>
            {/* -------------- Table END -------------- */}
        </>
    );
};

export default BooksList;