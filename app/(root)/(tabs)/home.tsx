import EventList from "@/components/EventList";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <EventList />
    </SafeAreaView>
  );
};

export default Home;
