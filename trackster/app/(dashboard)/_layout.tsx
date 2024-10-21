import { useStore } from '@/store';
import { Redirect, Tabs } from 'expo-router';

const Layout = () => {
  const token = useStore(state => state.token);

  if (!token) {
    return <Redirect href="sign-in" />;
  }

  return <Tabs screenOptions={{
    headerShown: false,
  }} />;
}

export default Layout;
