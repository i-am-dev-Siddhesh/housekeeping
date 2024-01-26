export interface IAdmin {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  profille_url: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IUser {
  name: string | null;
  id: number;
  language: string | null;
  phone_number: string | null;
  profile_url: string | null;
  location?: {
    place?: string;
    state?: string;
    country?: string;
    label?: string;
    postal_code?: number;
    latitude: number;
    longitude: number;
  };
  no_of_calls: number;
  wishlist: {
    cattles: Cattle[];
    id: number;
    userId: 2;
  };
  password?:string
}

export type Cattle = {
  id: number;
  current_milk_capacity: number;
  maximum_milk_capacity: number;
  pregnancy_number: number;
  price: number;
  category: string;
  is_negotiable: boolean;
  location: TLocation;
  lat: number;
  long: number;
  description: string;
  videos: string[];
  images: string[];
  seller: IUser;
  sellerId: number;
  createdAt: Date;
  updatedAt?: Date;
};

export type TLocation={
  label: string;
  place: string;
  state: string;
  country: string
}