import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  myLocations: { location: { lat: number, long: number }, locationName: string }[] = [
    { location: { lat: 4.7033333, long: -74.0452778 }, locationName: "Apto 125" },
    { location: { lat: 4.7019444, long: -74.0411111 }, locationName: "Unicentro" },
    { location: { lat: 4.6988889, long: -74.0433333 }, locationName: "Santa Beatriz" },
    { location: { lat: 4.8116667, long: -74.0555556 }, locationName: "Aeroclub" },
    { location: { lat: 4.7950000, long: -74.0477778 }, locationName: "Colegio Andino" },
    { location: { lat: 4.6602778, long: -74.0505556 }, locationName: "Club el Nogal" },
    { location: { lat: 4.7925000, long: -74.0772222 }, locationName: "Club Arrayanes" },
    { location: { lat: 4.6704057, long: -74.0997228 }, locationName: "Babu" },
    { location: { lat: 4.6795116, long: -74.0480238 }, locationName: "Julio Garzón" },
    { location: { lat: 4.7654520, long: -74.0625541 }, locationName: "Opas" },
  ]

  constructor() { }

  async getCurrentLocation(): Promise<{ lat: number; long: number }> {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      lat: coordinates.coords.latitude,
      long: coordinates.coords.longitude,
    };
  }

  async getCurrentLocationName(): Promise<string> {
    const current = await this.getCurrentLocation();

    // Haversine distance function
    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const toRad = (value: number) => (value * Math.PI) / 180;
      const R = 6371; // Earth radius in km

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    let closestLocation = null;
    let minDistance = Infinity;

    for (const loc of this.myLocations) {
      const dist = haversineDistance(
        current.lat,
        current.long,
        loc.location.lat,
        loc.location.long
      );
      if (dist < minDistance) {
        minDistance = dist;
        closestLocation = loc;
      }
    }

    return minDistance <= 1 ? closestLocation!.locationName : 'Unknown';
  }


}
