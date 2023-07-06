import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types";

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    updateContact: (state, action) => {
      const { id, ...contactData } = action.payload;
      const contact = state.contacts.find((c) => c.id === id);
      if (contact) {
        Object.assign(contact, contactData);
      }
    },
    deleteContact: (state, action) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload);
      if (index !== -1) {
        state.contacts.splice(index, 1);
      }
    },
  },
});

export const { addContact, updateContact, deleteContact } =
  contactSlice.actions;
export default contactSlice.reducer;
