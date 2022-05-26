import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Image, Text } from "react-native";
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from "@react-navigation/native";
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";

import OutlineButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getAddress, getMapPreview } from "../../util/location";

const LocationPicker = ({ onPickedLocation }) => {
	const [pickedLocation, setPickedLocation] = useState();
	const isFocused = useIsFocused();

	const navigation = useNavigation();
	const route = useRoute();

	const [
		locationPermissionInformation,
		requestPermission,
	] = useForegroundPermissions();

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = {
				lat: route.params.pickedLocation.lat,
				lng: route.params.pickedLocation.lng,
			};
			setPickedLocation(mapPickedLocation);
		}
	}, [route, isFocused]);

	useEffect(() => {
		const handleLocation = async () => {
			if (pickedLocation) {
				const address = await getAddress(
					pickedLocation.lat,
					pickedLocation.lng
				);
				onPickedLocation({ ...pickedLocation, address });
			}
		};
		handleLocation();
	}, [pickedLocation, onPickedLocation]);

	const verifyPermissions = async () => {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant location permissions to use this app!"
			);

			return false;
		}
		return true;
	};

	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const location = await getCurrentPositionAsync();
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	};

	const pickOnMapHandler = () => {
		navigation.navigate("Map");
	};

	let locationPreview = <Text>No Location Picked Yet</Text>;

	if (pickedLocation) {
		locationPreview = (
			<Image
				style={styles.image}
				source={{
					uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
				}}
			/>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlineButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlineButton>
				<OutlineButton icon="map" onPress={pickOnMapHandler}>
					Pick on Map
				</OutlineButton>
			</View>
		</View>
	);
};

export default LocationPicker;

const styles = StyleSheet.create({
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 4,
	},
});
