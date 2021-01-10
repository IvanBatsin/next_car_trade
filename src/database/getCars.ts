import { ParsedUrlQuery } from "querystring";
import { ICar } from "../../interfaces/ICar";
import { openDB } from "../openDB"
import { toStringOrNull, toNumberOrNull } from "../utils/getValueOrNull";

interface IGetCars {
  cars: ICar[],
  totalPages: number
}

export const getPaginatedCars = async (query: ParsedUrlQuery): Promise<IGetCars> => {
  const db = await openDB();

  const page = toNumberOrNull(query.page) || 1;
  const rowsPerPage = toNumberOrNull(query.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const mainQuery = `
    FROM Car
    WHERE (@make is NULL OR @make = make)
    AND (@model is NULL OR @model = model)
    AND (@minPrice is NULL OR @minPrice <= price)
    AND (@maxPrice is NULL OR @maxPrice >= price)
  `;

  const dbParams = {
    '@make': toStringOrNull(query.make),
    '@model': toStringOrNull(query.model),
    '@minPrice': toNumberOrNull(query.minPrice),
    '@maxPrice': toNumberOrNull(query.maxPrice)
  };

  const cars = await db.all<ICar[]>(`SELECT * ${mainQuery} LIMIT @rowsPerPage OFFSET @offset`, 
    {
      ...dbParams, 
      '@rowsPerPage': rowsPerPage,
      '@offset': offset
    });
  const totalRows = await db.get<{count: number}>(`SELECT COUNT(*) as count ${mainQuery}`, dbParams);

  return {cars, totalPages: Math.ceil(totalRows.count / rowsPerPage)};
}