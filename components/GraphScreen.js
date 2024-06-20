import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GraphScreen = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("formData");
        const formData = jsonValue != null ? JSON.parse(jsonValue) : [];

        const categories = [
          "Clinical",
          "Extracurricular",
          "Shadowing",
          "Volunteer",
          "Research",
        ];
        const dates = [...new Set(formData.map((item) => item.date))].sort(); // Unique and sorted dates

        const datasets = categories.map((category) => {
          const dataPoints = dates.map((date) => {
            const itemsForDate = formData.filter(
              (item) => item.date === date && item.category === category
            );
            const total = itemsForDate.reduce(
              (acc, curr) => acc + parseFloat(curr.number),
              0
            );
            return total;
          });

          return {
            data: dataPoints,
            color: (opacity = 1) =>
              `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, ${opacity})`, // Random color
            strokeWidth: 2,
          };
        });

        setData({
          labels: dates,
          datasets,
        });
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Category Data Over Time</Text>
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 20} // from react-native
          height={320}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default GraphScreen;
