
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const TrackCreateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Track Create Screen</Text>
    </View>
  );
}

export default TrackCreateScreen;
