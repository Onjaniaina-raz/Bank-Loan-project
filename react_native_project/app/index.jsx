import { Image, StyleSheet, Text, View } from "react-native";
import Logo from "../assets/img/logo.png";
import "../styles/global.css";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  return (
    <View className="h-full flex items-center bg-bank-01 justify-center gap-20">
      <View className="h-52 w-52 bg-white p-6 rounded-md">
        <Image source={Logo} className="h-full w-full" />
      </View>
      <View className="w-fit flex items-center gap-10">
        <Text className="text-bank-05">Welcome to Bank Loan Management app</Text>
        <View className="w-[300px] flex items-center bg-bank-04 py-4 rounded-lg">
          <Text className="text-bank-01 flex gap-2">
            Getting Started <Ionicons name="arrow-forward" />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
