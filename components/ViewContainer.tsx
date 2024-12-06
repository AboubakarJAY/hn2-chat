import React, { ReactNode } from "react";
import { View } from "react-native";

type ViewContainerProps = {
  children: ReactNode,
};

const ViewContainer: React.FC<ViewContainerProps> = ({ children }) => {
  return <View className="flex-1 justify-center items-center">{children}</View>;
};

export default ViewContainer;
