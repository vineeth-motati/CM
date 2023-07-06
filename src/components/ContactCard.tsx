import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../store/contactReducer";
import { useNavigate } from "react-router-dom";
import { Contact } from "../types";

interface Props {
  contact: Contact;
}

const ContactCard: React.FC<Props> = ({ contact }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/ContactForm/${contact.id}`);
  };

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };
  const getRandomProfilePic = (id: number) => {
    return `https://randomuser.me/api/portraits/men/${id}.jpg`;
  };

  return (
    <div className="w-[400px] h-[200px] text-center bg-stone-100 rounded-2xl drop-shadow-2xl">
      <div className="flex gap-5 h-full pr-3">
        <div className="h-full">
          <img
            className="rounded-l-2xl h-full overflow-hidden"
            src={getRandomProfilePic(contact.id)}
            alt="Profile Picture"
          />
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-3xl">{contact.name}</h2>
          <h2 className="text-sm">{contact.email}</h2>
          <h2 className="text-sm">{contact.phone}</h2>
          <div className="flex gap-10 justify-center">
            <button
              className="px-5 py-2 bg-blue-400 text-white rounded-md"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="px-5 py-2 bg-red-400 text-white rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <span
          className={`absolute  text-center justify-center rounded-full px-3 py-1 ${
            contact.status ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {contact.status ? "Active" : "In Active"}
        </span>
      </div>
    </div>
  );
};

export default ContactCard;
