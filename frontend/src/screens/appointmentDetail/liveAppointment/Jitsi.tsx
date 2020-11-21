import React, { RefObject } from 'react';

export const Jitsi = React.forwardRef<HTMLDivElement, any>(
  (_: any, ref: RefObject<HTMLDivElement>): JSX.Element => {
    return <div style={{ flex: '50%' }} ref={ref} />;
  },
);
