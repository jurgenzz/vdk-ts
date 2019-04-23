import { insertInDb, removeFromDb, getFromDb } from '../db/index';

interface ISaveReminder {
  (date: Date, msg: string, channel: string): Promise<number>;
}
export const saveReminder: ISaveReminder = async (date, msg, channel) => {
  let result = await insertInDb(`INSERT INTO reminders(msg, date, channel) VALUES(?, ?, ?)`, [msg, date, channel]);
  return result;
};

export const removeReminder = (reminder: number) => {
  removeFromDb(`DELETE FROM reminders WHERE ID=${reminder};`);
};

export const getAllReminders = async () => {
  let results = await getFromDb(`SELECT * FROM reminders;`);
  return results || [];
};
