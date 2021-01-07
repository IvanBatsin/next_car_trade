import { NextApiRequest, NextApiResponse } from "next/dist/next-server/lib/utils";
import { getModels } from "../../database/getModels";
import { getAsString } from "../../utils/toString";

export default async function models(req: NextApiRequest, res: NextApiResponse) {
  const make = getAsString(req.query.make);
  const models = await getModels(make);
  res.json(models);
}