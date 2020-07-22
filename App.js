import * as React from "react";
import { View, StatusBar } from "react-native";
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(
  // {
  // Home: {
  //   screen: TabNavigation
  // },
  // EntryDetail: {
  //   screen: EntryDetail,
  //   navigationOptions: {
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple,
  //     }
  //   }
  // }
  // }
);

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="History"
        component={History}
      />
      <Tab.Screen
        name="Add Entry"
        component={AddEntry}
      />
    </Tab.Navigator>
  )
}

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }}
    >
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen
        name="EntryDetail"
        component={EntryDetail}
        options={({ route }) => ({ title: route.params.entryId })} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <StackNavigation />
        </View>
      </Provider>
    </NavigationContainer>
  );
}
