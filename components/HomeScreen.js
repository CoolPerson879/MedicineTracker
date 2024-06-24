import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, Image, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  const [totals, setTotals] = useState({
    Clinical: 0,
    Extracurricular: 0,
    Shadowing: 0,
    Volunteer: 0,
    Research: 0,
  });

  const calculateTotals = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("formData");
      const formData = jsonValue != null ? JSON.parse(jsonValue) : [];

      const newTotals = {
        Clinical: 0,
        Extracurricular: 0,
        Shadowing: 0,
        Volunteer: 0,
        Research: 0,
      };

      formData.forEach((data) => {
        if (data.number && data.category) {
          newTotals[data.category] += parseFloat(data.number);
        }
      });

      setTotals(newTotals);
    } catch (error) {
      console.error("Error calculating totals", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      calculateTotals();
    }, [])
  );

  const renderItem = (item) => (
    <View key={item.category} style={styles.smallCard}>
      <Text style={styles.value}>{item.value}</Text>
      <Text style={styles.label}>{item.category}</Text>
    </View>
  );

  const data = [
    { category: "Clinical", value: totals.Clinical },
    { category: "Extracurricular", value: totals.Extracurricular },
    { category: "Shadowing", value: totals.Shadowing },
    { category: "Volunteer", value: totals.Volunteer },
    { category: "Research", value: totals.Research },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.bannerContainer}>
        <Image
          source={require("../assets/banner.jpeg")} // Local banner image
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "#529bbb"]} // Transparent to desired color
          style={styles.overlay}
        />
      </View>
      <LinearGradient
        colors={["#529bbb", "#eeaeca"]}
        style={styles.backgroundGradient}
      >
        <View style={styles.centralContainer}>
          <View style={styles.centralCard}>
            <Text style={styles.greeting}>Hello</Text>
            <View style={styles.row}>{data.map(renderItem)}</View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerContainer: {
    position: "relative",
    width: "100%",
    height: 250, // Adjust the height as needed to move the picture down
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundGradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centralContainer: {
    width: "90%",
    marginTop: -125, // Adjust the margin top value to move the container higher
    alignItems: "center", // Center horizontally

    backgroundColor: "transparent",
  },
  centralCard: {
    backgroundColor: "#ffffff",

    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",

    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 3,
    color: "white",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  smallCard: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: "45%", // Adjust width to fit two columns with margins
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    backgroundColor: "transparent",

    borderColor: "white",
    borderWidth: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
  value: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    marginTop: 5,
  },
});

export default HomeScreen;
