import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  {
    name: "test.db",
    location: "default",
  },
  () => console.log("Đã mở cơ sở dữ liệu!"),
  (error) => console.error("Lỗi khi mở cơ sở dữ liệu: ", error)
);

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INT)",
      [],
      (tx, results) => {
        console.log("Tạo bảng thành công!");
      },
      (tx, error) => {
        console.error("Lỗi: ", error);
      }
    );
  });
};

// Các hàm khác như insertUser, getAllUsers,...
