
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
    </View>
  );
}

export default AccountScreen;
