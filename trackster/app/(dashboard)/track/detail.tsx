
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const TrackDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Track Detail Screen</Text>
    </View>
  );
}

export default TrackDetailScreen;
