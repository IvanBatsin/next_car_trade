import { GetServerSideProps } from 'next';
import React from 'react';
import { ICar } from '../../../../../interfaces/ICar';
import { openDB } from '../../../../openDB';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto'
    },
    img: {
      width: "100%"
    },
  })
);

interface CarDescriptionProps {
  car: ICar | null
}

const CarDescription: React.FC<CarDescriptionProps> = ({car}: CarDescriptionProps): React.ReactElement => {
  const classes = useStyles();

  if (!car) {
    return <h1>Sorry, car can not found</h1>
  }
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img className={classes.img} alt="complex" src={car.photoUrl}/>
          </Grid>
          <Grid item xs={12} sm={6} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {car.make} - {car.model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Kilometers - {car.kilometers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Year - {car.year}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Fuel Type - {car.fuelType}
                </Typography>
                <hr></hr>
                <Typography variant="body2" color="textSecondary">
                  {car.details}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>${car.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default CarDescription;

export const getServerSideProps: GetServerSideProps<CarDescriptionProps> = async ctx => {
  const id = ctx.params.id;
  const db = await openDB();
  const car = await db.get<ICar | undefined>('select * from Car where id = ?', id);
  return {
    props: {
      car: car || null
    }
  }
}