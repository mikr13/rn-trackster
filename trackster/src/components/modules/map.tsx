import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
  },
});

type Props = {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  children?: React.ReactNode;
}

export const Map = ({ children, ...props }: Props) => {
  return (
    <MapView style={styles.map} {...props}>
      {children && children}
    </MapView>
  );
}

