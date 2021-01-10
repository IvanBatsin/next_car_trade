import { openDB } from "../openDB"

export interface IMake {
  make: string,
  count: number
}

export const getMakes = async() => {
  const db = await openDB();
  const makes = await db.all<IMake[]>('SELECT make, count(*) as count FROM Car GROUP BY make');
  return makes;
}