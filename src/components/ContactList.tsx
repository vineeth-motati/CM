import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Contact } from "../types";
import ContactCard from "./ContactCard";

const ContactList: React.FC = () => {
  const contacts: Contact[] = useSelector(
    (state: RootState) => state.contacts.contacts
  );

  return (
    <div>
      {contacts.length === 0 && <p>No contacts to display</p>}
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
