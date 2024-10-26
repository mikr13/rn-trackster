import { isAuthenticated } from '@/store';
import { Redirect, Tabs } from 'expo-router';

const Layout = () => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Redirect href="sign-up" />;
  }

  return <Tabs screenOptions={{
    headerShown: false,
  }} />;
}

export default Layout;
