import { StyleSheet } from "react-native";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{
        headerStyle: {backgroundColor: 'white'},
        headerTintColor: "#464e47"
      }}>
        <Stack.Screen name="index" options={{title:'Home', headerShown: false }}/>
        <Stack.Screen name="(dashboard)" options={{title:'Bank loan Management'}}/>
      </Stack>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
