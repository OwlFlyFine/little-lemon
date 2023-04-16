import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);"
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into menuitems (name, price, description, image, category) values ${menuItems
        .map(
          (item) =>
            `('${item.name}', '${item.price}', '${item.description}', '${item.image}', '${item.category}')`
        )
        .join(", ")}`
    );
  });
}
