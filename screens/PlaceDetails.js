import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, Image, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
	const [fetchedPlace, setFetchedPlace] = useState();

	const showOnMapHandler = () => {
		navigation.navigate("Map", {
			initialLat: fetchedPlace.location.lat,
			initialLng: fetchedPlace.location.lng,
		});
	};

	const selectedPlaceId = route.params.placeId;

	useEffect(() => {
		const loadPlaceData = async () => {
			const place = await fetchPlaceDetails(selectedPlaceId);
			setFetchedPlace(place);
			navigation.setOptions({
				title: place.title,
			});
		};
		loadPlaceData();
	}, [selectedPlaceId]);

	if (!fetchedPlace) {
		return (
			<View style={styles.fallback}>
				<Text>Fetching your data...</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.address}>
					<Text>{fetchedPlace.address}</Text>
				</View>
				<OutlinedButton icon="map" onPress={showOnMapHandler}>
					View on Map
				</OutlinedButton>
			</View>
		</ScrollView>
	);
};

export default PlaceDetails;

const styles = StyleSheet.create({
	fallback: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		height: "35%",
		minHeight: 300,
		width: "100%,",
	},
	locationContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	address: {
		color: Colors.primary500,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
});
