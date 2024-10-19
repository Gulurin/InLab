import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequestDetailsScreen = ({ route }) => {
  const { request } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{request.get("name")}</Text>
      <Text style={styles.description}>Description: {request.get("description")}</Text>
      <Text style={styles.price}>Price: ${request.get("price")}</Text>
      <Text style={styles.deadline}>Deadline: {new Date(request.get("deadline")).toLocaleDateString()}</Text>
      <Text style={styles.telephone}>Telephone: +{request.get("telephone")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
  price: {
    marginTop: 10,
    fontSize: 16, 
    color: 'green',
  },
  deadline: {
    marginTop: 10,
    fontSize: 16,
  },
  telephone: {
    marginTop: 12,
    fontSize: 30, 
    color: 'red',
  },
});

export default RequestDetailsScreen;
