import Grid from '@material-ui/core/Grid/Grid';
import { GetServerSideProps } from 'next';
import React from 'react';
import Search from '.';
import { ICar } from '../../interfaces/ICar';
import { getPaginatedCars } from '../database/getCars';
import { getMakes, IMake } from '../database/getMakes';
import { getModels, IModel } from '../database/getModels';
import { getAsString } from '../utils/toString';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import deepEqual from 'deep-equal';
import { CarsPagination } from '../components/CarsPagination';
import { CarCard } from '../components/CarCard';
import { stringify } from 'querystring';
interface CarsListProps {
  models: IModel[],
  makes: IMake[],
  cars: ICar[],
  totalPages: number
}

const CarsList: React.FC<CarsListProps> = ({cars, makes, models, totalPages}: CarsListProps): React.ReactElement => {
  const router = useRouter();
  const [serverQuery] = React.useState(router.query);
  const {data} = useSWR('/api/cars?' + stringify(router.query), {
    dedupingInterval: 15000,
    initialData: deepEqual(router.query, serverQuery) ? {cars, totalPages} : undefined
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <Search makes={makes} models={models} singleColumn/>
      </Grid>
      <Grid container item xs={12} sm={7} md={9} lg={10} spacing={3}>
        <Grid xs={12} item>
          {data === undefined ?
            <div>Loading...</div>
          :
            <CarsPagination totalPages={data.totalPages}/>
          }
        </Grid> 
        {data === undefined ?
          <div>Loading...</div>
        :
          data.cars.map(car => {
            return (
              <Grid style={{marginBottom:12}} key={car.id} item xs={12} sm={6}>
                <CarCard car={car}/>
              </Grid>
            )
          })
        }
      </Grid>
    </Grid>
  )
}

export default CarsList;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const make = getAsString(ctx.query.make);
  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getPaginatedCars(ctx.query)
  ]);
  return {
    props: {
      makes,
      models,
      cars: pagination.cars,
      totalPages: pagination.totalPages
    }
  }
}