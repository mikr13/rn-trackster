import { MapComp } from "@/components/modules/map";
import { Skeleton } from "@/components/ui/skeleton";
import { Large } from "@/components/ui/typography";
import { useErrorNotification } from "@/hooks/useErrorNotification";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
});

const TrackCreateScreen = () => {
  const [initialLocation, setInitialLocation] = useState<{
    coords: { latitude: number; longitude: number };
  } | null>(null);
  const [locations, setLocations] = useState<
    { latitude: number; longitude: number }[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        useErrorNotification(true, "Permission to access location was denied");
        setError("Permission to access location was denied");
        return;
      }
      const _initLocation = await getCurrentPositionAsync({
        accuracy: Accuracy.BestForNavigation,
      });
      setInitialLocation(_initLocation);

      const subscription = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 10000,
          distanceInterval: 1,
        },
        (location) => {
          console.log(location);
          setLocations((prevLocations) =>
            prevLocations?.length
              ? [...prevLocations, location.coords]
              : [location.coords],
          );
        },
      );

      return () => {
        subscription.remove();
      };
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Large>Track Create Screen</Large>
      {initialLocation ? (
        <MapComp
          initialRegion={{
            latitude: initialLocation.coords.latitude,
            longitude: initialLocation.coords.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          {locations && <Polyline coordinates={locations} />}
        </MapComp>
      ) : (
        <Skeleton className="h-80 w-full" />
      )}
    </SafeAreaView>
  );
};

export default TrackCreateScreen;
