import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);"
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

export async function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) =>
    db.transaction(
      (tx) => {
        tx.executeSql(
          `insert into menuitems (name, price, description, image, category) values ('${menuItems.name}', '${menuItems.price}', '${menuItems.description}', '${menuItems.image}', '${menuItems.category}')`
        );
      },
      reject,
      resolve
    )
  );
}

export async function filterByQueryAndCategories(query, activeCategories) {
  const categoriesString = activeCategories
    .map((c) => `'${c.toLowerCase()}'`)
    .join(", ");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from menuitems where category in (${categoriesString})`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
}
