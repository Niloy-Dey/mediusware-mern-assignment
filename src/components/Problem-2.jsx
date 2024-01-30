
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Problem2 = () => {
  const [showAllModal, setShowAllModal] = useState(false);
const [showUSModal, setShowUSModal] = useState(false);
const [showContactDetailsModal, setShowContactDetailsModal] = useState(false);
const [contacts, setContacts] = useState([]);
const [filteredContacts, setFilteredContacts] = useState([]);
const [onlyEven, setOnlyEven] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [pageNumber, setPageNumber] = useState(1);

useEffect(() => {
    fetchContacts();
}, [pageNumber]);

useEffect(() => {
    filterContacts();
}, [searchTerm, onlyEven, contacts]);

const fetchContacts = async () => {
    try {
        const response = await fetch(`https://contact.mediusware.com/api/contacts?page=${pageNumber}`);
        const data = await response.json();
        setContacts(data.contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
};

const filterContacts = () => {
    let filtered = contacts;
    if (onlyEven) {
        filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }
    filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
};

const handleAllButtonClick = () => {
    setShowAllModal(true);
    setShowUSModal(false);
};

const handleUSButtonClick = () => {
    setShowUSModal(true);
    setShowAllModal(false);
};

const handleCloseButtonClick = () => {
    setShowAllModal(false);
    setShowUSModal(false);
};

const handleCloseUSModal = () => {
    setShowUSModal(false);
};

const handleCloseContactDetailsModal = () => {
    setShowContactDetailsModal(false);
};

const handleContactClick = () => {
    setShowContactDetailsModal(true);
};

const loadMoreContacts = () => {
    setPageNumber(pageNumber + 1);
};


  return (
    <div className="container">
        <div className="row justify-content-center mt-5">
            <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
            <div className="d-flex justify-content-center gap-3">
                <Button variant="outline-primary" className="btn-lg" onClick={handleAllButtonClick}>
                    All Contacts
                </Button>
                <Button variant="outline-warning" className="btn-lg" onClick={handleUSButtonClick}>
                    US Contacts
                </Button>
            </div>

            {/* Modal A - All Contacts */}
            
<Modal show={showAllModal} onHide={handleCloseButtonClick}>
    <Modal.Header closeButton>
        <Modal.Title>All Contacts</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredContacts.map((contact) => (
            <div key={contact.id} onClick={handleContactClick}>
                {contact.name}
                {/* Render other contact details here */}
            </div>
        ))}
        <Button variant="primary" onClick={loadMoreContacts}>
            Load More
        </Button>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleAllButtonClick}>
            All contacts
        </Button>
        <Button variant="warning" onClick={handleUSButtonClick}>
            US Contacts
        </Button>
        <Button variant="danger" onClick={handleCloseButtonClick}>
           Close
        </Button>
        <Form.Check
            type="checkbox"
            label="Only even"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
        />
    </Modal.Footer>
</Modal>

            
            {/* Modal B - US Contacts */}
{/* Modal B - US Contacts */}
<Modal show={showUSModal} onHide={handleCloseUSModal}>
    <Modal.Header closeButton>
        <Modal.Title>US Contacts</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {/* Display US contacts here */}
        {filteredContacts.map((contact) => ( // Change filteredUSContacts to filteredContacts
            <div key={contact.id} onClick={() => handleContactClick(contact)}>
                {contact.name}
                {/* Render other contact details here */}
            </div>
        ))}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleAllButtonClick}>
            Modal Button A
        </Button>
        <Button variant="warning" onClick={handleUSButtonClick}>
            Modal Button B
        </Button>
        <Button variant="danger" onClick={handleCloseUSModal}>
            Modal Button C
        </Button>
        <Form.Check
            type="checkbox"
            label="Only even"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
        />
    </Modal.Footer>
</Modal>

            
{/* Modal C - Contact Details */}
<Modal show={showContactDetailsModal} onHide={handleCloseContactDetailsModal}>
    <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {/* Display contact details here */}
        {/* For example, display contact name, phone number, etc. */}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="danger" onClick={handleCloseContactDetailsModal}>
            Close
        </Button>
    </Modal.Footer>
</Modal>
        </div>
    </div>
);

 }
export default Problem2;





