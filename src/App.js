import { useState } from "react";
import "./App.css";
import { AddPet, PetDetails, Pets } from "./ui-components";
import { NavBar } from "./ui-components";
// import { Footer } from "./ui-components";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App({ user, signOut }) {
  const [showForm, setShowForm] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [pet, setPet] = useState();

  const [updatePet, setUpdatePet] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [about, setAbout] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const navBarOverrides = {
    Button: {
      onClick: signOut,
    },
    "Add Pet": {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(!showForm);
        setUpdatePet(false);
        setName("");
        setAge("");
        setBreed("");
        setAbout("");
        setColor("");
        setImage("");
      },
    },
  };

  const addPetOverrides = {
    TextField29766922: {
      placeholder: name,
    },
    TextField29766923: {
      placeholder: age,
    },
    TextField29766924: {
      placeholder: breed,
    },
    TextField36543089: {
      placeholder: about,
    },
    TextField36543096: {
      placeholder: color,
    },
    TextField36543103: {
      placeholder: image,
    },
    image: {
      src: !updatePet ? "" : updatePet.image,
    },
    Button36543111: {
      isDisabled: !updatePet ? true : false,
    },
    Button29766926: {
      isDisabled: !updatePet ? false : true,
    },
    Icon: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(false);
      },
    },
  };

  const petDetailsOverrides = {
    Close: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowProfileDetails(false);
      },
    },
  };

  return (
    <div className="App">
      <NavBar width={"100%"} overrides={navBarOverrides} />
      <header
        className="App-header"
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        {showForm && (
          <AddPet
            pet={updatePet}
            style={{
              textAlign: "left",
              margin: "1rem",
            }}
            overrides={addPetOverrides}
          />
        )}
        {showProfileDetails && (
          <PetDetails
            style={{
              margin: "1rem",
            }}
            pet={pet}
            overrides={petDetailsOverrides}
          />
        )}
        {!showForm && (
          <Pets
            itemsPerPage={6}
            overrideItems={({ item, index }) => ({
              overrides: {
                Button29766907: {
                  onClick: () => {
                    setPet(item);
                    setShowProfileDetails(!showProfileDetails);
                  },
                },
                Button36502709: {
                  onClick: () => {
                    if (!showForm) {
                      setShowForm(true);
                    }
                    setUpdatePet(item);
                    setName(item.name);
                    setAge(item.age);
                    setBreed(item.breed);
                    setAbout(item.about);
                    setColor(item.color);
                    setImage(item.image);
                  },
                },
              },
            })}
          />
        )}
      </header>
      {/* <Footer width={"100%"} /> */}
    </div>
  );
}

export default withAuthenticator(App);
