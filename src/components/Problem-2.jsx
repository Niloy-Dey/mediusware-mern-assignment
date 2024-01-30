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
    // Fetch contacts when component mounts
    fetchContacts();
  }, []);

  useEffect(() => {
    // Filter contacts when searchTerm changes
    filterContacts();
  }, [searchTerm]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://contact.mediusware.com/api/v1/contacts?page=1');
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const filterContacts = () => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const loadMoreContacts = async () => {
    setPageNumber(pageNumber + 1);
    try {
      const response = await fetch(`https://contact.mediusware.com/api/v1/contacts?page=${pageNumber}`);
      const data = await response.json();
      setContacts([...contacts, ...data.contacts]);
    } catch (error) {
      console.error('Error fetching more contacts:', error);
    }
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

  const handleContactClick = () => {
    setShowContactDetailsModal(true);
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
            <Button variant="primary" className='mt-2' onClick={loadMoreContacts}>
              Load More
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAllButtonClick}>
              Modal Button A
            </Button>
            <Button variant="warning" onClick={handleUSButtonClick}>
              Modal Button B
            </Button>
            <Button variant="danger" onClick={handleCloseButtonClick}>
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

        {/* Modal B - US Contacts */}
        <Modal show={showUSModal} onHide={handleCloseButtonClick}>
          {/* Similar structure as Modal A */}
          {/* ... */}
        </Modal>

        {/* Modal C - Contact Details */}
        <Modal show={showContactDetailsModal} onHide={() => setShowContactDetailsModal(false)}>
          {/* Similar structure as Modal A */}
          {/* ... */}
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;




// import React from 'react';

// const Problem2 = () => {


// return (

//         <div className="container">
//             <div className="row justify-content-center mt-5">
//                 <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

//                 <div className="d-flex justify-content-center gap-3">
//                     <button className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
//                     <button className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Problem2;


