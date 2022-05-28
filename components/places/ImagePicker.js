import React, { useState } from "react";
import { StyleSheet, Alert, View, Image, Text } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";

const ImagePicker = ({ onTakeImage }) => {
	const [pickedImage, setPickedImage] = useState();

	const [
		cameraPermissionInformation,
		requestPermission,
	] = useCameraPermissions();

	const verifyPermissions = async () => {
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant camera permissions to use this app!"
			);

			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		try {
			const hasPermission = await verifyPermissions();

			if (!hasPermission) {
				return;
			}

			const image = await launchCameraAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.5,
			});
			setPickedImage(image.uri);
			onTakeImage(image.uri);
		} catch (error) {
			console.error(error);
		}
	};

	let imagePreivew = <Text>No image taken yet.</Text>;

	if (pickedImage) {
		imagePreivew = <Image source={{ uri: pickedImage }} style={styles.image} />;
	}

	return (
		<View>
			<View style={styles.imagePreivew}>{imagePreivew}</View>
			<OutlinedButton icon="camera" onPress={takeImageHandler}>
				Take Image
			</OutlinedButton>
		</View>
	);
};

export default ImagePicker;

const styles = StyleSheet.create({
	imagePreivew: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
