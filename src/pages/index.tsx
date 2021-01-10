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
import axios from 'axios';
 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      maxWidth: 500,
      padding: 20,
    }
  }),
);

interface SearchProps {
  makes: IMake[],
  models: IModel[],
  singleColumn?: boolean
}

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

const Search: React.FC<SearchProps> = ({makes, models, singleColumn}: SearchProps): React.ReactElement => {
  const classes = useStyles();
  const router = useRouter();
  const smValue = singleColumn ? 12 : 6;

  const [modelsArray, setModelsArray] = React.useState<SearchProps['models']>(models);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: '/cars',
      query: {...formObj, page: 1}
    }, undefined, {shallow: true});
  }

  React.useEffect(() => {
    const updateModels = async function(){
      const {data: models} = await axios(`http://localhost:3000/api/models?make=${formObj.make}`);
      setModelsArray(models);
      const model =  getAsString(router.query.model) || 'All';
      handleChange('model', model);
    }

    updateModels();
  }, [formObj.make]);
  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.paper} elevation={5}>
        <Grid container spacing={3}> 
          <Grid item xs={12} sm={smValue}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="search-make">Make</InputLabel>
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
          <Grid item xs={12} sm={smValue}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="model">Models</InputLabel>
              <Select
                labelId="model"
                name="model"
                value={formObj.model}
                onChange={event => handleChange(event.target.name, event.target.value as string)}
              >
                {modelsArray.length > 0 && modelsArray.map(model => {
                  return (
                    <MenuItem key={model.model} value={model.model}>
                      {model.model} ({model.count})
                    </MenuItem>
                  )
                })}
                 <MenuItem value="All"><em>All</em></MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={smValue}>
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
          <Grid item xs={12} sm={smValue}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="max-price">Max Price</InputLabel>
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              Search Cars
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  )
}
export default Search;

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