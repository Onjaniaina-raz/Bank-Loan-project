import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#464e47",
          paddingTop: 10,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#568259",
      }}
    >
      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "list" : "list-outline"}
              color={focused ? "white" : "#568259"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "add-circle" : "add-circle-outline"}
              color={focused ? "white" : "#568259"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="histogram"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "stats-chart" : "stats-chart-outline"}
              color={focused ? "white" : "#568259"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
