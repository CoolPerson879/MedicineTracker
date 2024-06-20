import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  Hospital,
  Lightbulb,
  Activity,
  Heart,
  Beaker,
  Globe,
  Trash,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { name: "Clinical", icon: <Hospital color={"white"} /> },
  { name: "Extracurricular", icon: <Lightbulb color={"white"} /> },
  { name: "Shadowing", icon: <Activity color={"white"} /> },
  { name: "Volunteer", icon: <Heart color={"white"} /> },
  { name: "Research", icon: <Beaker color={"white"} /> },
  { name: "Total", icon: <Globe color={"white"} /> },
];

const DataScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("Clinical");
  const [data, setData] = useState([]);

  const fetchData = async (category) => {
    try {
      const jsonValue = await AsyncStorage.getItem("formData");
      const formData = jsonValue != null ? JSON.parse(jsonValue) : [];

      let filteredData = formData;
      if (category !== "Total") {
        filteredData = formData.filter((item) => item.category === category);
      }

      // Reverse the order of data to show the newest data at the top
      setData(filteredData.reverse());
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(selectedCategory);
    }, [selectedCategory])
  );

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const handleDelete = async (index) => {
    try {
      const updatedData = data.filter((_, i) => i !== index);
      setData(updatedData);
      await AsyncStorage.setItem("formData", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const renderDataItem = (label, value) => {
    if (!value) return null;
    return (
      <View style={styles.dataItem}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={["#94bbe9", "#eeaeca"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.buttonRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={[
                  styles.button,
                  selectedCategory === category.name && styles.buttonSelected,
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                {category.icon}
                <Text style={styles.buttonText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {data.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.dataContainer}>
                {renderDataItem("Name", item.name)}
                {renderDataItem("Number", item.number)}
                {renderDataItem(
                  "Date",
                  new Date(item.date).toLocaleDateString()
                )}
              </View>
              <View style={styles.dataContainer}>
                {renderDataItem("Email", item.email)}
                {renderDataItem("Extra", item.extra)}
                {renderDataItem("Extra", item.extrafieldone)}
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(index)}
                >
                  <Trash size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.categoryTitle}>{item.category}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#529bbb",
    borderRadius: 5,
  },
  buttonSelected: {
    backgroundColor: "#eeaeca",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 100, // Add extra padding at the bottom to avoid being hidden by the tab bar
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "100",
    marginTop: -20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginHorizontal: -5, // Negative margin to compensate for padding in dataItem
  },
  dataItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  value: {
    fontSize: 14,
    textAlign: "center",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
  },
});

export default DataScreen;
