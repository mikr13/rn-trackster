
import { Text } from '@/components/ui/text';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const TrackDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Track Detail Screen</Text>
    </SafeAreaView>
  );
}

export default TrackDetailScreen;
