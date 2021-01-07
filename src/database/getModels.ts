import { openDB } from "../openDB"

export interface IModel {
  models: string,
  count: number
};

export const getModels = async (make: string) => {
  const db = await openDB();
  const models = await db.all<IModel[]>('select model, count(*) as count from Car where make = @make group by model', {'@make': make});
  return models;
}