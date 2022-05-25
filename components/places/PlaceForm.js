import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Colors } from "../../constants/colors";
import Buttons from "../ui/Buttons";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [pickedLocation, setPickedLocation] = useState();
	const [selectedImage, setSelectedImage] = useState();

	const changeTitleHandler = (enteredText) => {
		setEnteredTitle(enteredText);
	};

	const savePlaceHandler = () => {
		console.log(enteredTitle);
		console.log(selectedImage);
		console.log(pickedLocation);
	};

	const takeImageHandler = (imageUri) => {
		setSelectedImage(imageUri);
	};

	const pickLocationHandler = useCallback((location) => {
		setPickedLocation(location);
	}, []);

	return (
		<ScrollView style={styles.form}>
			<View>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.input}
					onChangeText={changeTitleHandler}
					value={enteredTitle}
				/>
			</View>
			<ImagePicker onTakeImage={takeImageHandler} />
			<LocationPicker onPickedLocation={pickLocationHandler} />
			<Buttons onPress={savePlaceHandler}>Add Place</Buttons>
		</ScrollView>
	);
};

export default PlaceForm;

const styles = StyleSheet.create({
	form: {
		flex: 1,
		padding: 24,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 4,
		color: Colors.primary500,
	},
	input: {
		marginVertical: 8,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomColor: Colors.primary700,
		borderBottomWidth: 2,
		backgroundColor: Colors.primary100,
	},
});
