import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/core/types';
import {useFonts} from 'expo-font'
import Fonts from './src/theme/typographic';


export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const [fontsLoaded] = useFonts({
    'normsProRegular': Fonts.Poppins.normsProRegular,
    'normsProMediumItalic':  Fonts.Poppins.normsProMediumItalic,
    'normsProBoldItalic': Fonts.Poppins.normsProBoldItalic,
    'normsProBold': Fonts.Poppins.normsProBold,
   'normsProSemiBold': Fonts.Poppins.normsProSemiBold
  })

  
  if (!fontsLoaded) {
    // Render a loading indicator or fallback UI while fonts are being loaded
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  else{
    return (
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{ headerShown: false}}
        >
          <Stack.Screen name = "Auth" component = {AuthStack}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
