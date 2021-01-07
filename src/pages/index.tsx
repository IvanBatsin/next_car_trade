import { Grid, Paper } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select/Select';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getMakes, IMake } from '../database/getMakes';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button/Button';
import { getModels, IModel } from '../database/getModels';
import { getAsString } from '../utils/toString';
 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      maxWidth: 500,
      padding: 20,
    }
  }),
);

interface HomeProps {
  makes: IMake[],
  models: IModel[]
}

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

const Home: React.FC<HomeProps> = ({makes, models}: HomeProps): React.ReactElement => {
  const classes = useStyles();
  const router = useRouter();
  console.log(models);

  const [modelsArray, setModelsArray] = React.useState(models);
  const [formObj, setFormObj] = React.useState({
    make: getAsString(router.query.make) || 'All',
    model: getAsString(router.query.model) || 'All',
    minPrice: getAsString(router.query.minPrice) || 'All',
    maxPrice: getAsString(router.query.maxPrice) || 'All'
  });

  const handleChange = (key: string, value: string): void => {
    setFormObj(prevState => ({
      ...prevState,
      [key]: value
    }));
  }

  React.useEffect(() => {
    const updateModels = async function(){
      const models = await getModels(formObj.make);
      setModelsArray(models);
    }
  }, [formObj.make]);
  return (
    <form>
      <Paper className={classes.paper} elevation={5}>
        <Grid container spacing={3}> 
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="search-make">Age</InputLabel>
              <Select
                labelId="search-make"
                name="make"
                value={formObj.make}
                onChange={event => handleChange(event.target.name, event.target.value as string)}
              >
                {makes.map((make, index) => {
                  return (
                    <MenuItem key={`${make.make}${make.count}${index}`} value={make.make}>
                      {make.make} - {make.count}
                    </MenuItem>
                  )
                })}
                 <MenuItem value="All"><em>All</em></MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="model">Models</InputLabel>
              <Select
                labelId="model"
                name="model"
                value={formObj.model}
                onChange={event => handleChange(event.target.name, event.target.value as string)}
              >
                {models.map(model => {
                  return (
                    <MenuItem key={model.models} value={model.models}>
                      {model.models}
                    </MenuItem>
                  )
                })}
                 <MenuItem value="All"><em>All</em></MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="min-price">Min Price</InputLabel>
              <Select
                labelId="min-price"
                name="minPrice"
                value={formObj.minPrice}
                onChange={event => handleChange(event.target.name, event.target.value as string)}
              >
                {prices.map(price => {
                  return (
                    <MenuItem key={price} value={price}>
                      {price}
                    </MenuItem>
                  )
                })}
                 <MenuItem value="All"><em>All</em></MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="max-price">Min Price</InputLabel>
              <Select
                labelId="max-price"
                name="maxPrice"
                value={formObj.maxPrice}
                onChange={event => handleChange(event.target.name, event.target.value as string)}
              >
                {prices.map(price => {
                  return (
                    <MenuItem key={price} value={price}>
                      {price}
                    </MenuItem>
                  )
                })}
                 <MenuItem value="All"><em>All</em></MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button fullWidth variant="contained" color="primary">
              Show
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  )
}
export default Home;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const make = getAsString(ctx.query.make);
  const [makes, models] = await Promise.all([
    getMakes(),
    getModels(make)
  ]);
  return {
    props: {
      makes,
      models
    }
  }
}