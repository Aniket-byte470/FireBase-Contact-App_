import NavBar from "./Components/NavBar";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

import ContactCard from "./Components/ContactCard";
import Modal from "./Components/Modal";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import NotFoundContact from "./Components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          setLoading(true);
          return contactLists;
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getContacts();
  }, []);

  if (!loading)
    return (
      <div className="flex h-screen items-center justify-center text-3xl text-white">
        Loading...
      </div>
    );

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase()),
      );
      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <NavBar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <IoSearchSharp className="absolute ml-1 text-3xl text-white" />

            <input
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
              onChange={filterContacts}
            />
          </div>

          <IoIosAddCircleOutline
            onClick={onOpen}
            className="cursor-pointer text-5xl text-white"
          />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
