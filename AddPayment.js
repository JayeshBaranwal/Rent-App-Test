import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/firebase";
import sendReminder from "../utils/twilio";

const AddPayment = ({ renter }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const logPayment = async () => {
    if (!amount || !date) {
      alert("Please provide all payment details!");
      return;
    }
    try {
      await addDoc(collection(db, "payments"), {
        renterId: renter.id,
        amount,
        date,
      });
      alert("Payment recorded!");
    } catch (err) {
      console.error("Error logging payment:", err);
    }
  };

  const handleReminder = () => {
    const message = `Dear ${renter.name}, your rent of ${renter.rent} is due. Kindly make the payment.`;
    sendReminder(renter.phone, message);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Payment Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput placeholder="Payment Date" value={date} onChangeText={setDate} style={styles.input} />
      <Button title="Log Payment" onPress={logPayment} />
      <Button title="Send Reminder" onPress={handleReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginVertical: 8, borderWidth: 1, borderRadius: 8, padding: 8 },
});

export default AddPayment;
