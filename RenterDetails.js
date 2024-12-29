import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/firebase";

const AddRenterForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const addRenter = async () => {
    await addDoc(collection(db, "renters"), { name, phone });
    alert("Renter added!");
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <Button title="Add Renter" onPress={addRenter} />
    </View>
  );
};

export default AddRenterForm;
