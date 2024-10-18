import React, { useState } from "react";  
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";  
import Parse from "parse/react-native";  
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('2Xw271GwrshxYTqBf96GgWkvTB23dsxrkarQtDQt','WTcbO0UiP8g3cqSGS7M1KS8S4a4cjFubWQaYK8mN');  
Parse.serverURL = 'https://parseapi.back4app.com/';  

export const LoginScreen = ({ navigation }) => {  
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");  

  const doUserLogin = async () => {
    const usernameValue = username;
    const passwordValue = password;

    try {
      const user = await Parse.User.logIn(usernameValue, passwordValue);
      Alert.alert("Success!", `Welcome back, ${user.get("username")}!`);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };

  return (
    <View>
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
      <Button title={"Sign In"} onPress={doUserLogin} />  
      <Button 
        title={"No account? Would you like to Sign Up?"}  
        onPress={() => navigation.navigate('Registration')}
        color="gray"
      />  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  input: {  
    height: 40,  
    marginBottom: 10,  
    backgroundColor: "#fff",  
    paddingHorizontal: 10,
  },  
});
