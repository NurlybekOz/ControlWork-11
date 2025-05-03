
export interface UserFields {
    username: string;
    password: string;
    displayName: string;
    phone: number;
    token: string;
}

export interface Product {
    _id: string;
    user: User;
    category: string;
    title: string;
    price: number;
    description: string;
    image: string | null;
}

export type ProductWithoutId = Omit<Product, '_id'>;

export interface Category {
    _id: string;
    title: string;
    description: string;
}