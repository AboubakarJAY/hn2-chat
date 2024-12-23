import { styled } from "nativewind";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

interface ChatCardProps {
  profilePicture: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  onPress: () => void;
}

const ChatCard: React.FC<ChatCardProps> = ({
  profilePicture,
  name,
  lastMessage,
  timestamp,
  unreadCount,
  onPress,
}) => {
  return (
    <StyledTouchableOpacity
      className="flex-row items-center p-4 border-b border-gray-700"
      onPress={onPress}
    >
      <StyledImage
        source={
          profilePicture
            ? { uri: profilePicture }
            : require("@/assets/images/icon.png")
        }
        className="w-12 h-12 rounded-full"
      />
      <StyledView className="flex-1 ml-4">
        <StyledText
          className="text-white font-bold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </StyledText>
        <StyledText
          className="text-gray-400"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {lastMessage}
        </StyledText>
      </StyledView>
      <StyledView className="items-end">
        <StyledText className="text-gray-400 text-sm">{timestamp}</StyledText>
        {unreadCount > 0 && (
          <StyledView className="bg-green-500 rounded-full px-2 py-1 mt-1">
            <StyledText className="text-white text-xs font-bold">
              {unreadCount}
            </StyledText>
          </StyledView>
        )}
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default ChatCard;
