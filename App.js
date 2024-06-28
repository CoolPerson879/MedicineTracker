import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  Home,
  FileText,
  Plus,
  AreaChart,
  Settings as SettingsIcon,
} from "lucide-react-native";
import HomeScreen from "./components/HomeScreen";
import FormScreen from "./components/FormScreen";
import DataScreen from "./components/DataScreen";
import GraphScreen from "./components/GraphScreen";
import SettingsScreen from "./components/SettingsScreen";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -15,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#7F5DF0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="temp" component={DataScreen} />
      <InsideStack.Screen name="form" component={FormScreen} />
    </InsideStack.Navigator>
  );
}

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        // @ts-ignore
        initialRouteName={Login}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default App;

/* <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: "absolute",
              bottom: 25,
              left: 20,
              right: 20,
              backgroundColor: "#ffffff",
              borderRadius: 25,
              height: 85,
              ...styles.shadow,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Home
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#7F5DF0" : "#000000",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#7F5DF0" : "#000000",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Home
                  </Text>
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Form"
            component={FormScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Plus
                  style={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
                    color: focused ? "#7F5DF0" : "#000000",
                  }}
                />
              ),
              tabBarButton: (props) => (
                <CustomTabBarButton {...props}>
                  <Plus size={40} color="white" />
                </CustomTabBarButton>
              ),
            }}
          />
          <Tab.Screen
            name="Data"
            component={DataScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FileText
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#7F5DF0" : "#000000",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#7F5DF0" : "#000000",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                    numberOfLines={1}
                  >
                    View Data
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Analytics"
            component={GraphScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AreaChart
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#7F5DF0" : "#000000",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#7F5DF0" : "#000000",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Analytics
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <SettingsIcon
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#7F5DF0" : "#000000",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#7F5DF0" : "#000000",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Settings
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator> */
