import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: 'white',
      textDecoration: 'none'
    }
  }),
);

const Nav: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button>
            <Typography>
              <Link href="/">
                <a className={classes.link}>Home</a>
              </Link>
            </Typography>
          </Button>
          <Button>
            <Typography>
              <Link href="/faq">
                <a className={classes.link}>FAQ</a>
              </Link>
            </Typography>
          </Button>
          <Button>
            <Typography>
              <Link href="/cars">
                <a className={classes.link}>Cars</a>
              </Link>
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav;