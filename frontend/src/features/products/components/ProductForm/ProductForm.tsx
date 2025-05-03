import {useState} from "react";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {toast} from "react-toastify";
import {ProductMutation} from "../../../../types";
import FileInput from "../../../../UI/FileInput/FileInput";
import {useAppSelector} from "../../../../app/hooks.ts";
import {selectCategories, selectCategoriesLoading} from "../../../categories/categoriesSlice.ts";

interface Props {
    onSubmitProduct: (product: ProductMutation) => void;
}

const PostForm: React.FC<Props> = ({onSubmitProduct}) => {
    const [form, setForm] = useState<ProductMutation>({
        category: "",
        title: '',
        description: '',
        image: null,
        price: 0,
    })
    const categories = useAppSelector(selectCategories);
    const categoriesLoading = useAppSelector(selectCategoriesLoading)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title.trim() || !form.description.trim() || !form.image || !form.category || !form.price) {
            toast.error('All fields are required');
            return;
        }
        onSubmitProduct({...form})
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target

        if (files) {
            setForm(prevState => ({...prevState, [name]: files[0]}))
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ width: "75%", margin: "0 auto"}}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        select
                        disabled={categoriesLoading}
                        style={{width: '100%'}}
                        id="category"
                        label="Category"
                        value={form.category}
                        name='category'
                        onChange={onInputChange}
                    >
                        <MenuItem defaultValue='' disabled>Select category</MenuItem>
                        {categories.map(category => (
                            <MenuItem value={category._id} key={category._id}>{category.title}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        type={'number'}
                        id="price"
                        name='price'
                        label="Price"
                        value={form.price}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        multiline rows={3}
                        id="description"
                        name="description"
                        label="Description"
                        value={form.description}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button style={{width: '100%'}} type="submit" color="primary" variant="contained">
                       Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PostForm;