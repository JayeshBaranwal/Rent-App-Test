import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import db from "../utils/firebase";

const HomeScreen = ({ navigation }) => {
  const [renters, setRenters] = useState([]);

  useEffect(() => {
    const fetchRenters = async () => {
      const querySnapshot = await getDocs(collection(db, "renters"));
      const rentersList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setRenters(rentersList);
    };
    fetchRenters();
  }, []);

  return (
    <View>
      <FlatList
        data={renters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}: {item.phone}</Text>
        )}
      />
      <Button title="Add Renter" onPress={() => navigation.navigate("AddRenter")} />
    </View>
  );
};

export default HomeScreen;
