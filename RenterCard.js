import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const RenterCard = ({ renter, onDetailsPress, onReminderPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{renter.name}</Text>
      <Text style={styles.phone}>Phone: {renter.phone}</Text>
      <Text style={styles.rent}>Rent Due: {renter.rent || "Not Set"}</Text>
      <Button title="View Details" onPress={() => onDetailsPress(renter.id)} />
      <Button title="Send Reminder" onPress={() => onReminderPress(renter.phone)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  name: { fontSize: 18, fontWeight: "bold" },
  phone: { fontSize: 14, marginTop: 4 },
  rent: { fontSize: 14, marginTop: 4 },
});

export default RenterCard;
