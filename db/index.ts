import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./vdk.db', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('connected');

  db.run(
    `CREATE TABLE IF NOT EXISTS reminders(ID INTEGER PRIMARY KEY AUTOINCREMENT, msg text, date datetime, channel string)`
  );
  db.run(`CREATE TABLE IF NOT EXISTS commands(ID INTEGER PRIMARY KEY AUTOINCREMENT, command text, reply string)`);
});

interface Insert {
  (q: string, params: any): Promise<number>;
}

export const insertInDb: Insert = async (q, params) => {
  return new Promise(resolve => {
    db.run(q, params, function(err) {
      if (err) {
        console.log(err);
      }
      resolve(this.lastID);
    });
  });
};

export const removeFromDb = (q: string) => {
  db.run(q, function(err) {
    console.log(err);
  });
};

interface IRows {
  (q: string): Promise<any[]>;
}

export const getFromDb: IRows = q => {
  return new Promise(resolve => {
    db.all(q, function(err, rows) {
      if (err) {
        console.log(err);
      }
      resolve(rows);
    });
  });
};

export const getCommandsFromDb = () => {
  return new Promise(resolve => {
    db.all(`SELECT * FROM commands`, (err, rows: any[]) => {
      let res = {};
      rows.map(row => {
        //@ts-ignore
        res[row.command] = row.reply;
      });
      resolve(res);
    });
  });
};

export const saveCommand = (command: string, reply: string) => {
  return new Promise(resolve => {
    db.run(`INSERT INTO commands(command, reply) VALUES(?,?)`, [command, reply], function(err) {
      if (err) {
        console.log(err);
      }
      resolve(this.lastID);
    });
  });
};

// update
