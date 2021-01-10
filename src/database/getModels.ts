import { openDB } from "../openDB"

export interface IModel {
  model: string,
  count: number
};

export const getModels = async (make: string) => {
  const db = await openDB();
  const models = await db.all<IModel[]>('SELECT model, count(*) as count FROM Car WHERE make = @make GROUP BY model', {'@make': make});
  return models;
}