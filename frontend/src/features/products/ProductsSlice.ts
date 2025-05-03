import {Product} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createProduct, deleteProduct, fetchAllProducts, fetchProductById} from "./ProductsThunk.ts";

interface ProductsState {
    items: Product[];
    item: Product | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: ProductsState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, {payload: products}) => {
                state.items = products;
                state.fetchLoading = false;
            })

            .addCase(fetchProductById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, {payload: product}) => {
                state.item = product;
                state.fetchLoading = false;
            })

            .addCase(createProduct.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createProduct.rejected, (state) => {
                state.createLoading = false;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.fetchLoading = false;
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.fetchLoading = false;
            })

    }
});

export const productsReducer = productSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.item;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
