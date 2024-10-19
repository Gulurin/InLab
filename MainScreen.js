import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import Parse from "parse/react-native";  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('2Xw271GwrshxYTqBf96GgWkvTB23dsxrkarQtDQt', 'WTcbO0UiP8g3cqSGS7M1KS8S4a4cjFubWQaYK8mN');  
Parse.serverURL = 'https://parseapi.back4app.com/';

export const MainScreen = () => {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState("");
  const [requests, setRequests] = useState([]);
  const [telephone, setTelephone] = useState("");
  

  useEffect(() => {
    const fetchUserRole = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        const role = currentUser.get("user_role");
        setUserRole(role);
      }
    };

    const fetchRequests = async () => {
      const Request = Parse.Object.extend("requests");
      const query = new Parse.Query(Request);
      try {
        const results = await query.find();
        setRequests(results);
      } catch (error) {
        Alert.alert("Error!", error.message);
      }
    };

    fetchUserRole();
    fetchRequests();
  }, []);

  const addRequest = async () => {
    if (!name || !description || !price || !deadline) {
      Alert.alert("Error!", "Please fill in all fields.");
      return;
    }

    const Request = Parse.Object.extend("requests");
    const request = new Request();

    request.set("name", name);
    request.set("description", description);
    request.set("price", parseFloat(price));
    request.set("deadline", new Date(deadline));
    request.set("telephone", telephone);

    try {
      await request.save();
      Alert.alert("Success!", "Request has been added.");
      // Очистить поля после добавления
      setName("");
      setDescription("");
      setPrice("");
      setDeadline("");
      setTelephone("");

      // Обновить список запросов
      fetchRequests();
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };

  const renderRequestItem = ({ item }) => {
    const truncatedDescription = item.get("description").length > 100 ? item.get("description").substring(0, 100) + '...' : item.get("description");

    return (
      <TouchableOpacity onPress={() => navigation.navigate('RequestDetails', { request: item })}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.get("name")}</Text>
          <Text>{truncatedDescription}</Text>
          <Text style={styles.cardPrice}>Price: ${item.get("price")}</Text>
          <Text>Deadline: {new Date(item.get("deadline")).toLocaleDateString()}</Text>
          <Text style={styles.cardTelephone}>Telephone: +{item.get("telephone")}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Заказы</Text>
      {userRole === false && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Deadline (YYYY-MM-DD)"
            value={deadline}
            onChangeText={setDeadline}
          />
          <TextInput
            style={styles.input}
            placeholder="telephone"
            value={telephone}
            onChangeText={setTelephone}
          />
          <Button title="Add Request" onPress={addRequest} />
        </View>
      )}

      {userRole === true && (
        <FlatList
          data={requests}
          renderItem={renderRequestItem}
          keyExtractor={(item) => item.id}
          style={styles.requestList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    marginTop: 20,
    width: '100%',
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardPrice: {
    marginTop: 5,
    color: 'green',
  },
  cardTelephone: {
    marginTop: 5,
    color: 'red',
  },
  requestList: {
    width: '100%',
    marginTop: 20,
  },
});
