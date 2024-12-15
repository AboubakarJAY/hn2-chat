import EventCard from "@/components/EventCard";
import { DEFAULT_EVENTS } from "@/constantes/constantes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { ScrollView, View } from "react-native";

interface Event {
  image: string | any; // Accepte les URLs ou images locales
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  nombreParticipants: number;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>(DEFAULT_EVENTS); // Charger les événements par défaut
  const [loading, setLoading] = useState(true); // État de chargement
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false); // Savoir si les données ont été chargées une fois

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Vérifier si les données ont déjà été chargées
        const storedHasLoaded = await AsyncStorage.getItem("hasLoadedOnce");
        if (storedHasLoaded) {
          setHasLoadedOnce(true);
          setLoading(false); // Pas besoin de réafficher les animations
        }

        // Étape 1 : Récupérer les événements dans le local storage
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.events && parsedData.events.length > 0) {
            setEvents(parsedData.events);
          }
        } else {
          // Étape 2 : Si le local storage est vide, tenter de récupérer depuis le serveur
          const response = await fetch("http://192.168.43.146:4012/user/data", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.events && data.events.length > 0) {
              setEvents(data.events);
              await AsyncStorage.setItem("userData", JSON.stringify(data)); // Mettre en cache
            }
          }
        }
      } catch (error) {
        console.error("Erreur :", error); // Erreur silencieuse pour l'utilisateur
      } finally {
        // Arrêter l'état de chargement dans tous les cas
        setLoading(false);
        if (!hasLoadedOnce) {
          setHasLoadedOnce(true);
          await AsyncStorage.setItem("hasLoadedOnce", "true"); // Enregistrer l'état chargé
        }
      }
    };

    fetchEvents();
  }, []);

  const renderLoadingCards = () => (
    <View className="p-4">
      {[...Array(3)].map((_, index) => (
        <ContentLoader
          key={index}
          speed={2}
          width="100%"
          height={150}
          viewBox="0 0 400 150"
          backgroundColor="#333"
          foregroundColor="#555"
          className="rounded-lg mb-4"
        >
          <Rect x="0" y="0" rx="10" ry="10" width="100%" height="150" />
        </ContentLoader>
      ))}
    </View>
  );

  return (
    <ScrollView className="flex-1 p-4">
      {loading && !hasLoadedOnce
        ? renderLoadingCards()
        : events.map((event, index) => (
            <EventCard
              nombreParticipants={event.nombreParticipants}
              key={index}
              image={event.image}
              name={event.name}
              startDate={event.startDate}
              endDate={event.endDate}
              location={event.location}
              description={event.description}
            />
          ))}
    </ScrollView>
  );
};

export default EventList;
