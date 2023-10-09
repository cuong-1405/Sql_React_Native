import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet, TextInput } from "react-native";
import { storeData, getData, removeData } from "./storage";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const saveUserData = () => {
    // Kiểm tra trường username
    if (!username) {
      Alert.alert("Lỗi", "Nhập tên đăng nhập.");
      return; // thoát ra ngay lập tức, không thực hiện tiếp theo
    }

    // Kiểm tra trường password
    if (!password) {
      Alert.alert("Lỗi", "Nhập mật khẩu.");
      return; // thoát ra ngay lập tức, không thực hiện tiếp theo
    }

    // Lưu dữ liệu khi cả username và password đều không rỗng
    const user = {
      username,
      password,
    };
    storeData("user", user).then(() => {
      Alert.alert("Thành công", "Thông tin đã được lưu.");
    });
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
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default App;
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Alert,
//   StyleSheet,
//   TextInput,
//   FlatList,
// } from "react-native";
// import { storeData, getData, removeData } from "./storage";

// const App = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [accounts, setAccounts] = useState([]);
//   const [accountText, setAccountText] = useState("");

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const saveUserData = () => {
//     if (!username || !password) {
//       Alert.alert("Error", "Username and password cannot be empty.");
//       return;
//     }
//     const user = {
//       username,
//       password,
//     };
//     // Thêm tài khoản mới vào danh sách
//     setAccounts([...accounts, user]);
//     storeData("users", accounts).then(() => {
//       Alert.alert("Success", "User data has been saved.");
//       // Xóa giá trị nhập cho username và password
//       setUsername("");
//       setPassword("");
//     });
//   };

//   const fetchUserData = async () => {
//     const storedAccounts = await getData("users");
//     if (storedAccounts) {
//       setAccounts(storedAccounts);
//     }
//   };

//   const deleteUser = async (index) => {
//     const deletedUser = accounts[index];
//     const newAccounts = [...accounts];
//     newAccounts.splice(index, 1);
//     setAccounts(newAccounts);
//     storeData("users", newAccounts).then(() => {
//       Alert.alert(
//         "Success",
//         `User data for ${deletedUser.username} has been removed.`
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Save User Data" onPress={saveUserData} />
//       <FlatList
//         data={accounts}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <View style={styles.accountItem}>
//             <Text>{item.username}</Text>
//             <Button
//               title="Delete"
//               onPress={() => deleteUser(index)}
//               color="red"
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   input: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   accountItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
// });

// export default App;
