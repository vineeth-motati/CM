import { Link, Route, Routes } from "react-router-dom";
import {
  ContactForm,
  ContactList,
  ContactDetails,
  ChartsAndMaps,
  ContactPage,
} from "./components";

function App() {
  return (
    <>
      <div className="min-h-screen flex bg-slate-50">
        <nav className="bg-gray-800 w-64 h-screen">
          <ul className="flex flex-col p-4">
            <li className="mb-4">
              <Link
                to={"/ContactPage"}
                className="text-gray-300 hover:text-white"
              >
                Contacts
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to={"/ChartsAndMaps"}
                className="text-gray-300 hover:text-white"
              >
                Maps and Charts
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ContactPage />} />
          <Route path="/ContactForm/:id?" element={<ContactForm />} />
          <Route path="/ContactList" element={<ContactList />} />
          <Route path="/ContactDetails" element={<ContactDetails />} />
          <Route path="/ChartsAndMaps" element={<ChartsAndMaps />} />
          <Route path="/ContactPage" element={<ContactPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
