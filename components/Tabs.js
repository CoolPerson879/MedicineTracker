import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Home, Hospital, Plus } from "lucide-react-native";
import HomeScreen from "./HomeScreen";
import FormScreen from "./FormScreen";
import DataScreen from "./DataScreen";
import AnalyticsScreen from "./AnalyticsScreen";
const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => {
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#7F5DF0",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>;
};

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 25,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Home
                style={{
                  width: 25,
                  height: 25,
                  color: focused ? "#7F5DF0" : "#000000",
                }}
              />
              <Text
                style={{ color: focused ? "#7F5DF0" : "#000000", fontSize: 12 }}
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
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Hospital
                style={{
                  width: 25,
                  height: 25,
                  color: focused ? "#7F5DF0" : "#000000",
                }}
              />
              <Text
                style={{ color: focused ? "#7F5DF0" : "#000000", fontSize: 12 }}
              >
                Clinical
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Data"
        component={DataScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Home
                style={{
                  width: 25,
                  height: 25,
                  color: focused ? "#7F5DF0" : "#000000",
                }}
              />
              <Text
                style={{ color: focused ? "#7F5DF0" : "#000000", fontSize: 12 }}
              >
                Extracurricular
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={FormScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Plus
              style={{
                width: 25,
                height: 25,
                color: focused ? "#7F5DF0" : "#000000",
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Shadowing"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Home
                style={{
                  width: 25,
                  height: 25,
                  color: focused ? "#7F5DF0" : "#000000",
                }}
              />
              <Text
                style={{ color: focused ? "#7F5DF0" : "#000000", fontSize: 12 }}
              >
                Shadowing
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Volunteer"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Home
                style={{
                  width: 25,
                  height: 25,
                  color: focused ? "#7F5DF0" : "#000000",
                }}
              />
              <Text
                style={{ color: focused ? "#7F5DF0" : "#000000", fontSize: 12 }}
              >
                Volunteer
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Research"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Home
                style={{
                  width: 25,
                  height: 25,
                  color: focused ? "#7F5DF0" : "#000000",
                }}
              />
              <Text
                style={{ color: focused ? "#7F5DF0" : "#000000", fontSize: 12 }}
              >
                Research
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
  },
});

export default Tabs;
