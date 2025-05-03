import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Button, Card, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {apiUrl} from "../../../globalConstants.ts";
import {deleteProduct, fetchProductById} from "./ProductsThunk.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import {selectOneProduct, selectProductsLoading} from "./ProductsSlice.ts";
import {selectUser} from "../users/usersSlice.ts";
import { toast } from "react-toastify";


const FullProduct = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectOneProduct);
    const fetchLoading = useAppSelector(selectProductsLoading);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    const {id} = useParams();

    const handleDelete = async () => {
        try {
            if(!product?._id) return
            await dispatch(deleteProduct(product._id))
            toast.success("Product sold!");
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    return (
        <Container maxWidth="md">
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && product ?
                <Card sx={{ width: "50%", margin: "0 auto" }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={product.image ? apiUrl + '/' + product.image : undefined}
                            alt={product.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.title}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div">
                               <strong> Category: {product.category.title}</strong>
                            </Typography>
                            <Typography gutterBottom variant="caption" component="div">
                                {product.description}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div">
                                Phone number of seller: +996{product.user.phone}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div">
                                Seller name: <b>{product.user.username}</b>
                            </Typography>
                            <Typography variant="body1" sx={{marginBottom: '10px'}}>
                                <strong>Price: {product.price} $</strong>
                            </Typography>
                            {user?._id === product.user._id ?
                                <Button color='success' variant='contained' onClick={handleDelete}>Sold!</Button>
                             : null
                            }
                        </CardContent>
                        <IconButton component={NavLink} to='/'>
                            <ArrowBackIcon sx={{fontSize: "14px"}}/>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "10px" }}>
                                Go back home
                            </Typography>
                        </IconButton>
                </Card>
                :
                <Typography variant="h6">Not found product</Typography>
            }
        </Container>
    );
};

export default FullProduct;