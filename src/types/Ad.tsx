export interface Ad {
    title: string;
    description: string;
    price: number;
    ad_type: string;
    location: string;
    address: string;
    category: string;
    manufacturer?: string;
    imageUrl: string;
}