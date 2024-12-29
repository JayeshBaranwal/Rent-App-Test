import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import db from "../utils/firebase";

const PaymentsScreen = ({ navigation }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "payments"));
        const paymentList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPayments(paymentList);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchPayments();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.paymentCard}>
            <Text>Renter ID: {item.renterId}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
      />
      <Button
        title="Add Payment"
        onPress={() => navigation.navigate("AddPayment")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  paymentCard: {
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
});

export default PaymentsScreen;
