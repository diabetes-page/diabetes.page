import { Text } from 'react-native';
import React from 'react';
import { Converse } from './Converse';
import { Jitsi } from './Jitsi';

export function LiveAppointment(): JSX.Element {
  return (
    <>
      <Text>Live Training</Text>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Jitsi />
        <Converse />
      </div>
    </>
  );
}
