import { styled } from "nativewind";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EventCardProps {
  image: string | any; // URL de la photo de l'événement
  name: string; // Nom de l'événement
  startDate: string; // Date de début (formatée)
  endDate: string; // Date de fin (formatée)
  location: string; // Lieu de l'événement
  description: string;
  nombreParticipants: number;
}

interface Comment {
  id: number;
  user: { profilePicture: string; name: string };
  text: string;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const EventCard: React.FC<EventCardProps> = ({
  image,
  name,
  startDate,
  endDate,
  location,
  description,
  nombreParticipants,
}) => {
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false); // État pour "Participer"/"Annuler"
  const [participants, setParticipants] = useState(nombreParticipants); // Nombre de participants
  const [showComments, setShowComments] = useState(false); // Afficher/masquer la section de commentaires
  const [comments, setComments] = useState<Comment[]>([]); // Liste des commentaires
  const [newComment, setNewComment] = useState(""); // Nouveau commentaire saisi

  // Gérer la participation
  const handleParticipation = () => {
    if (isParticipating) {
      setParticipants((prev) => Math.max(prev - 1, 0));
    } else {
      setParticipants((prev) => prev + 1);
    }
    setIsParticipating(!isParticipating);
  };

  // Ajouter un commentaire
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        user: {
          profilePicture: "https://via.placeholder.com/40", // Image par défaut
          name: "User",
        },
        text: newComment,
      };
      setComments((prev) => [...prev, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <StyledView className="bg-black rounded-lg p-4 shadow-lg mb-4">
      {/* Image */}
      <StyledImage
        source={
          typeof image === "string"
            ? { uri: image } // Cas d'une URL
            : image // Cas d'une image locale (require)
        }
        className="h-40 w-full rounded-lg"
        resizeMode="cover"
      />

      {/* Informations de l'événement */}
      <StyledText className="text-white text-lg font-bold mt-4">
        {name}
      </StyledText>
      <StyledText className="text-gray-400 text-sm mt-1">
        {startDate} - {endDate}
      </StyledText>
      <StyledText className="text-gray-400 text-sm mt-1">{location}</StyledText>
      <StyledText className="text-white text-sm mt-2">{description}</StyledText>

      {/* Section Participants */}
      <StyledView className="flex-row items-center justify-between mt-4">
        <StyledTouchableOpacity
          onPress={handleParticipation}
          className={`px-4 py-2 rounded ${
            isParticipating ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <StyledText className="text-white font-bold">
            {isParticipating ? "Annuler" : "Participer"}
          </StyledText>
        </StyledTouchableOpacity>
        <StyledText className="text-gray-300">
          Participants : {participants}
        </StyledText>
      </StyledView>

      {/* Bouton pour afficher/masquer les commentaires */}
      <StyledTouchableOpacity
        onPress={() => setShowComments(!showComments)}
        className="mt-4"
      >
        <StyledText className="text-blue-700 font-bold">
          {showComments
            ? "Masquer les commentaires"
            : "Afficher les commentaires"}
        </StyledText>
      </StyledTouchableOpacity>

      {/* Section des commentaires */}
      {showComments && (
        <StyledView className="mt-4">
          {/* Liste des commentaires */}
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <StyledView className="flex-row items-start mb-4">
                <StyledImage
                  source={{ uri: item.user.profilePicture }}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <StyledView className="flex-1">
                  <StyledText className="text-gray-300 font-bold">
                    {item.user.name}
                  </StyledText>
                  <StyledText className="text-white">{item.text}</StyledText>
                </StyledView>
              </StyledView>
            )}
          />
          <Modal
            visible={isImageModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setImageModalVisible(false)}
          >
            <View className="flex-1 bg-black justify-center items-center">
              <TouchableOpacity
                style={{ position: "absolute", top: 40, right: 20 }}
                onPress={() => setImageModalVisible(false)}
              >
                <Text className="text-white text-2xl">×</Text>
              </TouchableOpacity>
              <Image
                source={image}
                className="w-full h-4/5"
                resizeMode="contain"
              />
            </View>
          </Modal>

          {/* Formulaire pour ajouter un commentaire */}
          <StyledView className="border-t border-gray-600 pt-4 mt-4">
            <StyledTextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Ajoutez un commentaire..."
              placeholderTextColor="#aaa"
              className="bg-gray-800 text-white p-3 rounded-lg mb-2"
            />
            <StyledTouchableOpacity
              onPress={handleAddComment}
              className="bg-blue-500 p-3 rounded-lg"
            >
              <StyledText className="text-white font-bold text-center">
                Commenter
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
};

export default EventCard;
