export interface Exercise {
id: string;
name: string;
description: string;
GeoData: Geolocation;
duration: number;
calories: number;
date?: Date;
state?: 'completed'| 'cancalled' | null;
long: number;
lat: number;
geopoint: Geolocation;
}