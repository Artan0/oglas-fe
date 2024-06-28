import { User } from "./user";

export interface CarDetails {
    manufacturer: string;
    car_type: string;
    color: string;
    fuel_type: string;
    mileage: number;
}

export interface AdDetails {
    id: number;
    title: string;
    description: string;
    price: number;
    ad_type: string;
    location: string;
    address: string;
    category: string;
    image_urls: string[];
    owner: User;
    car_details?: CarDetails;
}