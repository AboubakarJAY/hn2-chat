import { styled } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

interface NotificationItemProps {
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

const StyledView = styled(View);
const StyledText = styled(Text);

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  date,
  isRead,
}) => {
  return (
    <StyledView
      className={`p-4 rounded-lg mb-4 ${
        isRead ? "bg-gray-800" : "bg-blue-900"
      } border border-gray-600`}
    >
      <StyledText className="text-white font-bold text-lg">{title}</StyledText>
      <StyledText className="text-gray-300 mt-2">{message}</StyledText>
      <StyledText className="text-gray-500 text-sm mt-2">{date}</StyledText>
    </StyledView>
  );
};

export default NotificationItem;
