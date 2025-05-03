import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {Product, ProductMutation} from "../../types";
import {RootState} from "../../app/store.ts";

export const fetchAllProducts = createAsyncThunk<Product[], string | null>(
    'products/fetchAllProducts',
    async (categoryId) => {
        const url = categoryId ? `/products?category=${categoryId}` : '/products';
        const response = await axiosAPI.get<Product[]>(url);
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk<Product, string>(
    'products/fetchProductById',
    async (product_id) => {
        const response = await axiosAPI.get<Product>('/products/' + product_id);
        return response.data || null;
    }
);


export const createProduct = createAsyncThunk<
    void,
    ProductMutation,
    {state: RootState}
>(
    'products/createProduct',
    async (productToAdd, {getState}) => {
        const token = getState().users.user?.token;
        const formData = new FormData();
        const keys = Object.keys(productToAdd) as (keyof ProductMutation)[];

        keys.forEach(key => {
            const value = productToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/products', formData, {
            headers: {Authorization: `${token}`},
        });
    }
);
export const deleteProduct = createAsyncThunk<
    void,
    string,
    {state: RootState}
>(
    'products/deleteProduct',
    async (product_id, {getState}) => {
        const token = getState().users.user?.token;

        const response = await axiosAPI.delete(`/products/${product_id}`, {
            headers: {Authorization: `${token}`},
        });
        return response.data || null;
    }
);