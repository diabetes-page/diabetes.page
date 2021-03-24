import { makeStyles, TypographyProps } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';
import React from 'react';

type Props = TypographyProps & {
  icon: SvgIconComponent;
  pos: 'left' | 'right';
};

export function Icon(props: Props): JSX.Element {
  const Icon = props.icon;
  const classes = useStyles();

  return <Icon className={classes[props.pos]} />;
}

const useStyles = makeStyles((theme) => ({
  left: {
    marginRight: theme.spacing(1),
  },
  right: {
    marginLeft: theme.spacing(1),
  },
}));
