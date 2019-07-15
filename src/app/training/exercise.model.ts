export interface Exercise {
id: string;
name: string;
GeoData: Geolocation;
duration: number;
calories: number;
date?: Date;
state?: 'completed'| 'cancalled' | null;
}