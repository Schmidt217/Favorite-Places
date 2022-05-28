import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({ route }) => {
	const [loadedPlaces, setLoadedPlaces] = useState([]);

	const isFocused = useIsFocused();

	useEffect(() => {
		const loadPlaces = async () => {
			const places = await fetchPlaces();
			setLoadedPlaces(places);
			// console.log(places);
		};
		if (isFocused) {
			loadPlaces();
		}
	}, [isFocused]);

	return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
