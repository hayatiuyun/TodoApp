import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import IndexScreen from './src/screens/IndexScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './src/screens/DetailScreen';
import {Provider} from './src/context/taskContext';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            component={IndexScreen}
            name="Home"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen component={DetailScreen} name="Detail" />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
