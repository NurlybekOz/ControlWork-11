import {Button, Grid, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";
import ProductItem from "./components/ProductItem/ProductItem.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCategories} from "../categories/categoriesSlice.ts";
import {fetchAllProducts} from "./ProductsThunk.ts";
import { fetchAllCategories } from "../categories/categoriesThunk.ts";
import {selectProducts, selectProductsLoading} from "./ProductsSlice.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";


const Products = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const fetchLoading = useAppSelector(selectProductsLoading);
    const items =  useAppSelector(selectProducts);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const categoryFilter = queryParams.get("category");

    useEffect(() => {
        if (categoryFilter) {
            dispatch(fetchAllProducts(categoryFilter))
        } else {
            dispatch(fetchAllProducts(null))
        }

        dispatch(fetchAllCategories());
    }, [categoryFilter, dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            {fetchLoading ? <Spinner/> :
                <Grid container justifyContent="space-between">

                    <Grid size={3}>
                        {categories.length > 0 ?
                            <ul>
                                <li><Button variant="text" component={Link} to={`/`}>All items</Button></li>
                                {categories.map(category => (
                                    <li key={category._id}><Button variant="text" component={Link} to={`?category=${category._id}`}>{category.title}</Button></li>
                                ))}
                            </ul>
                            :
                            null
                        }
                    </Grid>

                    <Grid size={9}>
                        {items.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                            <Grid container direction="row" spacing={2}>
                                {items.map(product => (
                                    <ProductItem
                                        key={product._id}
                                        title={product.title}
                                        category_title={product.category.title}
                                        price={product.price}
                                        id={product._id}
                                        image={product.image || null}
                                    />
                                ))}
                            </Grid>
                        }
                    </Grid>
                </Grid>
            }

        </Grid>
    );
};

export default Products;
