import { useDispatch, useSelector } from 'react-redux';
import { ContactItem } from './ContactItem';
import { ContactListStyled } from './Contacts.styled';
import { deleteContact } from '../../redux/contactsSlice';
import { getContacts, getFilter } from '../../redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const onDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ContactListStyled>
      {filterContacts.map(({ id, name, number }) => {
        return (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            onDelete={onDelete}
          />
        );
      })}
    </ContactListStyled>
  );
};
