import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    sno: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
  });

  const [editFormData, setEditFormData] = useState({
    sno: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      sno: addFormData.sno,
      firstname: addFormData.firstname,
      lastname: addFormData.lastname,
      phoneNumber: addFormData.phoneNumber,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      sno: editFormData.sno,
      firstname: editFormData.firstname,
      lastname: editFormData.lastname,
      phoneNumber: editFormData.phoneNumber,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      sno: contact.sno,
      firstname: contact.firstname,
      lastname: contact.lastname,
      phoneNumber: contact.phoneNumber,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <h2 class="h2">User Details</h2>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>S no</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2 class="h2">Add a User</h2>
      <form class="input-form" onSubmit={handleAddFormSubmit}>
        <input
          type="number"
          name="sno"
          required="required"
          placeholder="S no"
          onChange={handleAddFormChange}
        /> &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          name="firstname"
          required="required"
          placeholder="Enter First Name..."
          onChange={handleAddFormChange}
        />&nbsp;&nbsp;&nbsp;&nbsp;
        
        <input
          type="text"
          name="lastname"
          required="required"
          placeholder="Enter Last Name"
          onChange={handleAddFormChange}
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter phone number..."
          onChange={handleAddFormChange}
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <button class="add" type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;