// 1 get all
// get by id
//add, edit, remove
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'todoList',
});

export const createTable = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, todoName VARCHAR(30), content VARCHAR(100))`,
      [],
      (sqlTxn, res) => {
        console.log('create success');
      },
      (err) => {
        console.log(err);
      },
    );
  });
};

export const getAllTask = () => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM todo`,
        [],
        (sqlTxn, res) => {
          const length = res.rows.length;

          let results = [];
          for (let i = 0; i < length; i++) {
            let item = res.rows.item(i);

            results.push(item);
          }
          resolve(results);
        },
        (err) => {
          reject(null);
          throw new Error('err: ' + err.message);
        },
      );
    });
  });
};

export const addTask = (newTask, newContent) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM todo WHERE todoName = ?;`,
        [newTask],
        (sqlTxn, res) => {
          if (res.rows.length > 0) {
            resolve(false);
          } else {
            db.transaction((txn) => {
              txn.executeSql(
                `INSERT INTO todo (todoName, content) VALUES (?, ?)`,
                [newTask, newContent],
                (sqlTxn, res) => {
                  console.log('add successfully');
                  resolve(true);
                },
                (err) => {
                  console.log('falied to add', err);
                },
              );
            });
          }
        },
        (err) => {
          reject(err);
        },
      );
    });
  });
};

export const DelTask = (title) => {
  db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM todo WHERE todoName = ?;`,
      [title],
      (sqlTxn, res) => {
        console.log('delete successfully');
      },
      (err) => {
        console.log('falied to delete', err);
      },
    );
  });
};

export const updateTask = (rootTitle, newTitle, content) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT todoName FROM todo WHERE todoName = ?;`,
        [newTitle],
        (sqlTxn, res) => {
          if (res.rows.length !== 0) {
            resolve(false);
          } else {
            db.transaction((txn) => {
              txn.executeSql(
                `UPDATE todo SET todoName = ?, content = ? WHERE todoName = ?;`,
                [newTitle, content, rootTitle],
                (sqlTxn, res) => {
                  console.log('update successfully');
                  resolve(true);
                },
                (err) => {
                  console.log('falied to update', err);
                },
              );
            });
          }
        },
        (err) => {
          reject(err);
        },
      );
    });
  });
};
