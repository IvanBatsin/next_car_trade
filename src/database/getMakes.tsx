import { openDB } from "../openDB"

export interface IMake {
  make: string,
  count: number
}

export const getMakes = async() => {
  const db = await openDB();
  const makes = await db.all<IMake[]>('select make, count(*) as count from Car group by make');
  return makes;
}