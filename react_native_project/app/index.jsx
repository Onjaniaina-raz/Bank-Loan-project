import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import Logo from "../assets/img/logo.png";
import "../styles/global.css";
import { router } from 'expo-router';

const Home = () => {
  return (
    <View className="h-full flex items-center bg-bank-01 justify-center gap-20 pt-6">
      <View className="h-52 w-52 bg-white p-6 rounded-lg border border-bank-05">
        <Image source={Logo} className="h-full w-full" />
      </View>
      <View className="w-fit flex items-center gap-9">
        <Text className="text-bank-05">
          Welcome to Bank Loan Management app
        </Text>
        <Pressable
          className="w-[300px] flex flex-row justify-center items-center gap-2 bg-bank-04 py-4 rounded-lg active:opacity-75"
          activeOpacity={0.7}
          onPress={() => router.push('/list')}
        >
          <Text className="text-bank-01">Getting Started</Text>
          <Ionicons name="arrow-forward" color="#f1fffa" size={18} />
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
