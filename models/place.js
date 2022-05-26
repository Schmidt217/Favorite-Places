export class Place {
	constructor(title, imageUri, location, id) {
		this.title = title;
		this.imageUri = imageUri;
		this.address = location.address;
		this.location = { lat: location.lat, lng: location.lng }; // {lat: 32.2345 long: 106.31844}
		this.id = id;
	}
}
