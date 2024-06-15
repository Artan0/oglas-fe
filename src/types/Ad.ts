export interface Ad {
    id?: number
    title: string;
    description: string;
    price: number;
    ad_type: string;
    location: string;
    address: string;
    category: string;
    manufacturer?: string;
    image_urls: string[];
    color: string;
    car_type: string;
    fuel_type: string;
    car_details?:any
}
