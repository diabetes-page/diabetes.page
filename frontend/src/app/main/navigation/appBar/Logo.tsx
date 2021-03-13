import { Box, makeStyles } from '@material-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import {
  LOGO_ALT_TEXT,
  LOGO_HEIGHT,
  LOGO_PATH,
  LOGO_WIDTH,
} from '../../../../config/style';
import { toHomePage } from '../../../../pages';

export function Logo(): JSX.Element {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Box
      className={classes.logo}
      onClick={() => void router.push(toHomePage())}
    >
      <Image
        src={LOGO_PATH}
        alt={LOGO_ALT_TEXT}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: theme.spacing(1),
    cursor: 'pointer',
  },
}));
