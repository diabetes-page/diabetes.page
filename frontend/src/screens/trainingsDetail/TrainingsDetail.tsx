import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import React from 'react';
import { LiveTraining } from './liveTraining/LiveTraining';

export function TrainingsDetail(): JSX.Element {
  return (
    <View>
      <LiveTraining />
    </View>
  );
}
