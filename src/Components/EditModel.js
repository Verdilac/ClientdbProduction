import React, {  useState,useEffect } from "react";
import BookDataService from "../Util/BookDataContext";


import { Table, Button, Form, Row, Col, Container, InputGroup } from "react-bootstrap";
//MUI imports
// Imports from MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function EditModel({id,HOpen}) {



        // MUI
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [currentId, setcurrentId] = useState('')
        
    
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };


    // Edit States
    const [ename, setEName] = useState("");
    const [edescription, setEDescription] = useState("");
    const [econtact, setEContact] = useState("");
    const [eemail, setEEmail] = useState("");
    const [ecategory, setECategory] = useState("");
    const [esubCategory, setESubCategory] = useState("");
    const [ehouseNo, setEHouseNo] = useState("");
    const [estreet, setEStreet] = useState("");
    const [edistrict, setEDistrict] = useState("");
    const [ecity, setECity] = useState("");
    const [epostalCode, setEPostalCode] = useState("");
    const [ecountry, setECountry] = useState("");



    // Handling Edit
    const handleEditClick = async (id) => {
        const docSnap = await BookDataService.getBook(id);
        console.log("the record is here:", docSnap.data());
        setEName(docSnap.data().name);
        setEDescription(docSnap.data().description);
        setEContact(docSnap.data().contact);
        setEEmail(docSnap.data().email);
        setECategory(docSnap.data().category);
        setESubCategory(docSnap.data().subCategory);
        setEHouseNo(docSnap.data().houseNo);
        setEStreet(docSnap.data().street);
        setEDistrict(docSnap.data().district);
        setECity(docSnap.data().city);
        setEPostalCode(docSnap.data().postalCode);
        setECountry(docSnap.data().country);

    }

        // 1) Fetch all books as the page is loaded (run only once)
        useEffect(() => {
           handleEditClick(id);
           open= HOpen;
           
        }, []);


    const handleEdit = async () => {

        const newBook = {
            name: ename,
            description: edescription,
            contact: econtact,
            email: eemail,
            category: ecategory,
            subCategory: esubCategory,
            houseNo: ehouseNo,
            street: estreet,
            district: edistrict,
            city: ecity,
            postalCode: epostalCode,
            country: ecountry,
        };

        console.log(id);

        console.log(newBook);
        await BookDataService.updateBook(id, newBook);

    }









  return (
    <div>

        <h1>YYYYYYYYYOOOOOOOOMODLLLLLLLLLL</h1>
                <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>

                                            {/* ------------- Form Inside Modal START ------------- */}
                                            <Container>
                                                <Form className='rounded p-4 p-sm-4 border'>
                                                    <h1 className='font-weight-bold text-center pb-4'>
                                                        Data Form
                                                    </h1>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookTitle">
                                                                <Form.Label>Name</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Company Name"
                                                                        value={ename}
                                                                        onChange={(e) => setEName(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                <Form.Label>Description</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Description"
                                                                        value={edescription}
                                                                        onChange={(e) => setEDescription(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            {/* -------------- Main Category Dropdown START -------------- */}
                                                            <FormControl fullWidth className="mb-3">
                                                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={ecategory}
                                                                    label="Category"
                                                                    onChange={(e) => { setECategory(e.target.value) }}
                                                                >
                                                                    <MenuItem value={"Eat"}>Eat</MenuItem>
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
                                                            {/* -------------- Main Category Dropdown END -------------- */}
                                                        </Col>
                                                        <Col>
                                                            {/* -------------- Sub Category Dropdown START -------------- */}
                                                            <FormControl fullWidth className="mb-3">
                                                                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                                                {
                                                                    ecategory === "Eat" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Coffee Shops"}>Coffee Shops</MenuItem>
                                                                        <MenuItem value={"Pubs"}>Pubs</MenuItem>
                                                                        <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
                                                                        <MenuItem value={"Bar"}>Bar</MenuItem>
                                                                        <MenuItem value={"Bakeries"}>Bakeries</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select> : ecategory === "Goods" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Grocery Shops"}>Grocery Shops</MenuItem>
                                                                        <MenuItem value={"Supermarket"}>Supermarket</MenuItem>
                                                                        <MenuItem value={"Stationary"}>Stationary</MenuItem>
                                                                        <MenuItem value={"Pet Shops"}>Pet Shops</MenuItem>
                                                                        <MenuItem value={"For Homes"}>For Homes</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select> : ecategory === "Repair and Construction" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
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
                                                                    </Select> : ecategory === "Car Service" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Car Repair"}>Car Repair</MenuItem>
                                                                        <MenuItem value={"Car Washes"}>Car Washes</MenuItem>
                                                                        <MenuItem value={"Tire Fitting"}>Tire Fitting</MenuItem>
                                                                        <MenuItem value={"Refueling"}>Refueling</MenuItem>
                                                                        <MenuItem value={"Auto Disassembly"}>Auto Disassembly</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select> : ecategory === "Medicine" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Pharmacies"}>Pharmacies</MenuItem>
                                                                        <MenuItem value={"Hospital"}>Hospital</MenuItem>
                                                                        <MenuItem value={"Dispensary"}>Dispensary</MenuItem>
                                                                        <MenuItem value={"Other"}>Other</MenuItem>
                                                                    </Select> : ecategory === "Auto Goods" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Car Batteries"}>Car Batteries</MenuItem>
                                                                        <MenuItem value={"Tyres and Wheels"}>Tyres and Wheels</MenuItem>
                                                                        <MenuItem value={"Oil & Car Chemicals"}>Oil & Car Chemicals</MenuItem>
                                                                        <MenuItem value={"Motor Transport"}>Motor Transport</MenuItem>
                                                                        <MenuItem value={"Spare Parts"}>Spare Parts</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select> : ecategory === "Beauty" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Hairdressers"}>Hairdressers</MenuItem>
                                                                        <MenuItem value={"Cosmetologist"}>Cosmetologist</MenuItem>
                                                                        <MenuItem value={"Manicure and Pedicure"}>Manicure and Pedicure</MenuItem>
                                                                        <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
                                                                        <MenuItem value={"Solariums"}>Solariums</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select> : ecategory === "Entertainment" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Clubs"}>Clubs</MenuItem>
                                                                        <MenuItem value={"Night Clubs"}>Night Clubs</MenuItem>
                                                                        <MenuItem value={"Saunas"}>Saunas</MenuItem>
                                                                        <MenuItem value={"Baths"}>Baths</MenuItem>
                                                                        <MenuItem value={"Cinemas"}>Cinemas</MenuItem>
                                                                        <MenuItem value={"Amusement"}>Amusement</MenuItem>
                                                                        <MenuItem value={"Children Playrooms"}>Children Playrooms</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select> : ecategory === "Sports" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Gym"}>Gym</MenuItem>
                                                                        <MenuItem value={"Fitness Centers"}>Fitness Centers</MenuItem>
                                                                        <MenuItem value={"Sections"}>Sections</MenuItem>
                                                                        <MenuItem value={"Other"}>Other</MenuItem>
                                                                    </Select> : ecategory === "Services" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Household"}>Household</MenuItem>
                                                                        <MenuItem value={"Transport"}>Transport</MenuItem>
                                                                        <MenuItem value={"Finance"}>Finance</MenuItem>
                                                                        <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
                                                                        <MenuItem value={"Legal services"}>Legal services</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select> : ecategory === "Special Stores" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Furniture"}>Furniture</MenuItem>
                                                                        <MenuItem value={"Flowers"}>Flowers</MenuItem>
                                                                        <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                                                        <MenuItem value={"Clothes"}>Clothes</MenuItem>
                                                                        <MenuItem value={"Shoes"}>Shoes</MenuItem>
                                                                        <MenuItem value={"Souvenirs"}>Souvenirs</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select> : ecategory === "Tourism" ? <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
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
                                                                        value={esubCategory}
                                                                        label="Sub Category"
                                                                        onChange={(e) => { setESubCategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Fish"}>Fish</MenuItem>
                                                                        <MenuItem value={"Meat"}>Meat</MenuItem>
                                                                        <MenuItem value={"Drinks"}>Drinks</MenuItem>
                                                                        <MenuItem value={"Confectionery"}>Confectionery</MenuItem>
                                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                                    </Select>
                                                                }

                                                            </FormControl>
                                                            {/* -------------- Sub Category Dropdown END -------------- */}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookTitle">
                                                                <Form.Label>Contact Number</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        placeholder="Contact Number"
                                                                        value={econtact}
                                                                        onChange={(e) => setEContact(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                <Form.Label>Email</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="email"
                                                                        placeholder="Email"
                                                                        value={eemail}
                                                                        onChange={(e) => setEEmail(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookTitle">
                                                                <Form.Label>House Number</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Number"
                                                                        value={ehouseNo}
                                                                        onChange={(e) => setEHouseNo(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                <Form.Label>Street</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Street"
                                                                        value={estreet}
                                                                        onChange={(e) => setEStreet(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                <Form.Label>City</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="City"
                                                                        value={ecity}
                                                                        onChange={(e) => setECity(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookTitle">
                                                                <Form.Label>District</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="District"
                                                                        value={edistrict}
                                                                        onChange={(e) => setEDistrict(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="formBookTitle">
                                                                <Form.Label>Postal Code</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Postal Code"
                                                                        value={epostalCode}
                                                                        onChange={(e) => setEPostalCode(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group className="mb-4" controlId="formBookAuthor">
                                                                <Form.Label>Country</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Country"
                                                                        value={ecountry}
                                                                        onChange={(e) => setECountry(e.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>





                                                    <div className="d-grid gap-2">
                                                        <Button variant="primary" type="button" onClick={(e) => { handleClose(); handleEdit()}} >
                                                            Add/ Update
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Container>
                                            {/* ------------- Form Inside Modal END ------------- */}
                                        </Box>
                                    </Modal>
                                    {/* -------------- Modal Form END -------------- */}



    </div>
  )
}
