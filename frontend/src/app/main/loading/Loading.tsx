import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import React from 'react';

export function Loading(): JSX.Element {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Box display="flex" height="100vh" alignItems="center">
        <Box
          display="flex"
          width="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress className={classes.margin} />
          Loading diabetes.page... {/*Todo: i18n*/}
        </Box>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
}));
