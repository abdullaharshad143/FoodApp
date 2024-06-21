import { ActivityIndicator, Text, View } from 'react-native';
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/core/types';
import { useFonts } from 'expo-font'
import Fonts from './src/theme/typographic';
import store from './src/redux/store'
import { Provider } from 'react-redux';
import HomeStack from './src/navigation/HomeStack';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './config/firebase';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Constants from 'expo-constants';
  

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const [fontsLoaded] = useFonts({
    'normsProRegular': Fonts.Poppins.normsProRegular,
    'normsProMediumItalic': Fonts.Poppins.normsProMediumItalic,
    'normsProBoldItalic': Fonts.Poppins.normsProBoldItalic,
    'normsProBold': Fonts.Poppins.normsProBold,
    'normsProSemiBold': Fonts.Poppins.normsProSemiBold
  })
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isNavigationReady, setNavigationReady] = useState(false)
  const [isNavigationRead1y, setNavigationRead1y] = useState<
    keyof RootStackParamList | undefined
  >('AuthStack')
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        AsyncStorage.clear()
      } else {
        await user.reload()
      }
    })
  }, [])

  useEffect(() => {
    const gotoLogin = async () => {
      const userId = await AsyncStorage.getItem('userId')
      console.log(userId)
      if (userId) {
        setNavigationRead1y('HomeStack')
      } else {
        setNavigationRead1y('AuthStack')
      }
      setNavigationReady(true)
    }
    gotoLogin()
  }, [])
  if (!isNavigationReady) {
    return (
      <View style={{justifyContent:'center', alignSelf:'center'}}>
        <ActivityIndicator size="large" color="#FFD08A" />
      </View>
    );
  }
  const persistor = persistStore(store)
  console.log(isNavigationRead1y);
  if (!fontsLoaded) {
    <View style={{justifyContent:'center', alignSelf:'center'}}>
        <ActivityIndicator size="large" color="#FFD08A" />
      </View>
  }
  else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={isNavigationRead1y}
            >
              <Stack.Screen name="HomeStack" component={HomeStack} />
              <Stack.Screen name="AuthStack" component={AuthStack} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
