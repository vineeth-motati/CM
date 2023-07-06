import { Link } from "react-router-dom";
import { ContactList } from ".";

const ContactPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center pt-10 overflow-auto">
      <h1 className="text-3xl font-bold text-blue-600">Contacts</h1>
      <Link
        to={"/ContactForm"}
        className="px-5 m-10 py-2 bg-amber-200 rounded-md text-black"
      >
        Add new
      </Link>
      <ContactList />
    </div>
  );
};

export default ContactPage;
