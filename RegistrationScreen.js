import React, { useState } from "react";  
import { Alert, Button, StyleSheet, Switch, TextInput, View, Text } from "react-native";  
import Parse from "parse/react-native";  
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('2Xw271GwrshxYTqBf96GgWkvTB23dsxrkarQtDQt', 'WTcbO0UiP8g3cqSGS7M1KS8S4a4cjFubWQaYK8mN');  
Parse.serverURL = 'https://parseapi.back4app.com/';  

export const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");  
  const [email, setEmail] = useState("");  
  const [userRole, setUserRole] = useState(false); // false по умолчанию

  const doUserRegistration = async () => {
    const usernameValue = username;
    const passwordValue = password;
    const emailValue = email;

    try {
      const createdUser = await Parse.User.signUp(usernameValue, passwordValue, { 
        email: emailValue,
        user_role: userRole, // Добавляем роль пользователя
      });

      Alert.alert("Success!", `User ${createdUser.get("username")} was successfully created!`);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput  
        style={styles.input}  
        value={username}  
        placeholder={"Username"}  
        onChangeText={(text) => setUsername(text)}  
        autoCapitalize={"none"}  
      />  
      <TextInput  
        style={styles.input}  
        value={password}  
        placeholder={"Password"}  
        secureTextEntry  
        onChangeText={(text) => setPassword(text)}  
      />  
      <TextInput  
        style={styles.input}  
        value={email}  
        placeholder={"Email"}  
        onChangeText={(text) => setEmail(text)}  
        autoCapitalize={"none"}  
      />  
      <View style={styles.switchContainer}>
        <Text>Исполнитель?: {userRole ? "Да" : "Нет"}</Text>
        <Switch
          value={userRole}
          onValueChange={() => setUserRole(previousState => !previousState)}
        />
      </View>
      <Button title={"Sign Up"} onPress={doUserRegistration} />  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  input: {  
    height: 40,  
    marginBottom: 10,  
    backgroundColor: "#fff",  
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  }
});
