
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";
import {apiUrl} from "../../../../../globalConstants.ts";


interface Props {
    title: string;
    price: number;
    id: string;
    category_title: string;
    image: string | null;
}

const ProductItem: React.FC<Props> = ({title, price, category_title,  id, image}) => {


    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                {image ?
                    <CardMedia
                        component="img"
                        height="200"
                        image={apiUrl + '/' + image}
                        alt={title}
                    /> : null
                }
                <CardHeader title={title} />
                <CardContent>
                    <p style={{display: "flex", flexDirection: "column", margin: '0'}}>
                        <strong>
                            Category: {category_title}
                        </strong>
                        <b> Price: {price} $</b>
                    </p>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/products/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;