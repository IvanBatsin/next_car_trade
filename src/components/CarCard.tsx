import React from 'react';
import { ICar } from '../../interfaces/ICar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useRouter } from 'next/router';

interface CarCardProps {
  car: ICar
}

export const CarCard: React.FC<CarCardProps> = ({car}: CarCardProps): React.ReactElement => {
  const router = useRouter();
  const handleShowCarPage = () => {
    router.push(`/car/${car.make}/${car.model}/${car.id}`);
  };

  return (
    <Card elevation={3}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {car.make[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <OpenInNewIcon onClick={handleShowCarPage}/>
          </IconButton>
        }
        title={car.model + ' ' + car.make}
        subheader={'$' + car.price}
      />
      <CardMedia
        style={{height:240}}
        image={car.photoUrl}
        title={car.make + ' ' + car.model}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {car.details}
        </Typography>
      </CardContent>
    </Card>
  )
}