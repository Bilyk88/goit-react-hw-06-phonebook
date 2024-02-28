// import { nanoid } from 'nanoid';
import { ContactList } from './Contacts/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const updateFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  const addContactHandler = newContact => {
    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      dispatch(addContact(newContact));
      // dispatch(addContact({ ...newContact, id: nanoid() }));
    }
  };

  const deleteContactHandler = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div
      style={{
        height: '100vh',
        maxWidth: '460px',
        padding: '15px',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContactHandler} />
      <h2>Contacts</h2>
      <Filter filter={filter} onUpdateFilter={updateFilter} />
      {filterContacts.length > 0 && (
        <ContactList
          contacts={filterContacts}
          onDelete={deleteContactHandler}
        />
      )}
    </div>
  );
};
