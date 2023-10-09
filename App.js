import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet, TextInput } from "react-native";
import { storeData, getData, removeData } from "./storage";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const saveUserData = () => {
    if (username && password) {
      const user = {
        username,
        password,
      };
      storeData("user", user).then(() => {
        Alert.alert("Thành công", "Thông tin đã được lưu.");
      });
    } else {
      Alert.alert("Lỗi", "Nhập tên đăng nhập hoặc mật khẩu.");
    }
  };

  const fetchUserData = async () => {
    const user = await getData("user");
    if (user) {
      Alert.alert("Thông tin: ", JSON.stringify(user));
    } else {
      Alert.alert("Lỗi ", "Không tìm thấy người dùng.");
    }
  };

  const deleteUser = async () => {
    const user = await getData("user");
    if (user) {
      removeData("user").then(() => {
        Alert.alert("Thành công", `Người dùng ${user.username} đã bị xóa.`);
      });
    } else {
      Alert.alert("Lỗi", "Không có dữ liệu.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Lưu thông tin đăng nhập" onPress={saveUserData} />
      <Button title="Thông tin người dùng" onPress={fetchUserData} />
      <Button title="Xóa người dùng" onPress={deleteUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default App;
