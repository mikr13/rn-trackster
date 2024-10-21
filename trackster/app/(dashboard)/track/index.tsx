
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useStore } from '@/store';
import { StyleSheet, View } from 'react-native';

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
    <View style={styles.container}>
      <Text>Track List Screen</Text>
      <Text>{token}</Text>
      <Button onPress={() => signOut()}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}

export default TrackListScreen;
