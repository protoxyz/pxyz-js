import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ProtocolAuthProvider, IsLoggedIn, IsLoggedOut } from '@protoxyz/auth-react';
import * as SecureStore from "expo-secure-store";
import SignInScreen from './screens/SignIn';
import SignOutButton from './components/SignOutButton';

const tokenCache = {
  getToken(key: string): Promise<string | null> {
    try {
     return SecureStore.getItemAsync(key);
    }
    catch (err) {
     return new Promise((resolve) => resolve(null))
    }
  },
  saveToken(key: string, value: string): Promise<void> {
    try {
     return SecureStore.setItemAsync(key, value);
    }
    catch (err) {
     return new Promise((resolve) => resolve())
    } 
  },
  deleteToken(key: string): Promise<void> {
    try {
     return SecureStore.deleteItemAsync(key);
    }
    catch (err) {
     return new Promise((resolve) => resolve())
    }
  }
};

export default function App() {
  

  return (
    <ProtocolAuthProvider tokenCache={tokenCache}>
      <SafeAreaView style={styles.container}>
        <IsLoggedIn>
          <Text>You are Signed in</Text>

          <SignOutButton />
        </IsLoggedIn>
        <IsLoggedOut>
          <SignInScreen />
        </IsLoggedOut>
      </SafeAreaView>
    </ProtocolAuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});