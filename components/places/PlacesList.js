import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import PlaceItem from "../PlaceItem";

const PlacesList = ({ places }) => {
	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>No places added yet!</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={places}
			key={places.id}
			renderItem={({ item }) => <PlaceItem place={item} />}
		/>
	);
};

export default PlacesList;

const styles = StyleSheet.create({
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 16,
	},
});
