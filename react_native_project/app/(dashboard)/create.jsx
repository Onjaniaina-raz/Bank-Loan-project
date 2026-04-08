import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../../styles/global.css";

const create = () => {
  return (
    <View className="flex-1 bg-bank-01 flex items-center justify-center gap-8">
      <Text className="relative bottom-4 font-bold text-bank-05 text-balance text-xl">
        M a k e    a    L o a n    <Ionicons name="card-outline" size={24} color="#464e47" />
      </Text>
      <View className="bg-white w-[80%] h-[60%] rounded-lg border">
        <ScrollView className="h-full w-full px-6 my-8">
          <View className="flex gap-6">
            <TextInput
              className="p-6 rounded-lg border border-bank-05"
              placeholder="Account number"
            />
            <TextInput
              className="p-6 rounded-lg border border-bank-05"
              placeholder="Client"
            />

            <TextInput
              className="p-6 rounded-lg border border-bank-05"
              placeholder="Bank"
            />

            <TextInput
              className="p-6 rounded-lg border border-bank-05"
              placeholder="Amount"
            />

            {/* <TextInput
              className="p-6 rounded-lg border border-bank-05"
              placeholder="Date (YYYY-MM-DD)"
            /> */}

            <TextInput
              className="p-6 rounded-lg border border-bank-05"
              placeholder="Loan %"
            />
          </View>
        </ScrollView>
      </View>

      <Pressable
        className="w-[300px] flex flex-row justify-center items-center gap-2 bg-bank-04 py-4 rounded-lg active:opacity-75"
        activeOpacity={0.7}
        // onPress={() => router.push("/list")}
      >
        <Text className="text-bank-01">I N S E R T</Text>
        <Ionicons name="arrow-forward" color="#f1fffa" size={18} />
      </Pressable>
    </View>
  );
};

export default create;
