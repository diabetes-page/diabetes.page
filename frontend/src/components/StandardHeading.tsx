import { Typography, TypographyProps } from '@material-ui/core';

type Props = TypographyProps & {
  children: React.ReactNode;
};

export function StandardHeading(props: Props): JSX.Element {
  return (
    <Typography variant="h3" gutterBottom {...props}>
      {props.children}
    </Typography>
  );
}
