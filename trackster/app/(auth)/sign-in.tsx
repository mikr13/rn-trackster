
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useStore } from '@/store';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const SignInScreen = () => {
  const signIn = useStore(state => state.signIn);
  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <Button onPress={() => {
        signIn('token')
        router.replace('/track')
      }}>
        <Text>Sign In</Text>
      </Button>
    </View>
  );
}

export default SignInScreen;
