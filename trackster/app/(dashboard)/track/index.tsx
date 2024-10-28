
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useStore } from '@/store';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const TrackListScreen = () => {
  const signOut = useStore(state => state.signOut);
  const token = useStore(state => state.token);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Track List Screen</Text>
      <Text>{token}</Text>
      <Button variant="secondary" onPress={() => router.push('/track/create')}>
        <Text>Go to Create Track</Text>
      </Button>
      <Button onPress={() => signOut()}>
        <Text>Logout</Text>
      </Button>
    </SafeAreaView>
  );
}

export default TrackListScreen;
