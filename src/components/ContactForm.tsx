import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addContact, updateContact } from "../store/contactReducer";
import { Contact } from "../types";
import { RootState } from "../store/store";

interface ContactFormProps {
  contactToEdit?: Contact;
}

const ContactForm: React.FC<ContactFormProps> = ({ contactToEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const { id } = useParams();

  const [formData, setFormData] = useState<Contact>({
    id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
    name: "",
    email: "",
    phone: "",
    status: true,
  });
  useEffect(() => {
    if (contactToEdit) {
      setFormData(contactToEdit);
    } else if (id) {
      const selectedContact = contacts.find(
        (contact) => contact.id === Number(id)
      );
      if (selectedContact) {
        setFormData(selectedContact);
      }
    }
  }, [contactToEdit, id, contacts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? value === "active" : e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contactToEdit || id) {
      dispatch(updateContact(formData));
    } else {
      dispatch(addContact(formData));
    }

    setFormData({
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
      name: "",
      email: "",
      phone: "",
      status: true,
    });
    navigate("/ContactPage");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center pt-10 overflow-auto">
      <h1 className="text-3xl font-bold text-blue-600 pb-10">
        Add new contact
      </h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status:</label>
          <div className="flex items-center">
            <label htmlFor="active" className="mr-2">
              <input
                type="radio"
                id="active"
                name="status"
                value="active"
                checked={formData.status}
                onChange={handleChange}
              />
              Active
            </label>
            <label htmlFor="inactive" className="mr-2">
              <input
                type="radio"
                id="inactive"
                name="status"
                value="inactive"
                checked={!formData.status}
                onChange={handleChange}
              />
              Inactive
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
