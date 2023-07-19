import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Actions/Actions'
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Pagination, Rating, Stack, Typography } from '@mui/material'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import CategoryList from './CategoryList'


function ProductList() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])

    console.log("listpage", category)
    useEffect(() => {
        dispatch(getProducts())

    }, [])

    const { products } = useSelector((state) => state.products)

    const onClickHandler = (id) => {
        console.log(id)
        navigate(`/product/${id}`)

    }

    const pageSize = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };



    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const cardStyle = {
        backgroundColor: '#f2f2f2',

        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s',
        cursor: 'pointer',
    };
    return (
        <>
            <Navbar products={products} />
            <Grid style={{ display: "flex" }} >
                <Grid sx={{ p: 8 }} style={{ flex: 1 }} >
                    <CategoryList changeCategory={(category) => setCategory(category)} />
                </Grid>
                <Container sx={{ mt: 8 }} style={{ flex: 9 }} >

                    <Grid container spacing={2}>
                        {products.filter((product) => category.length === 0 || category.some((cat) => product.category.includes(cat))).slice(startIndex, endIndex).map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>

                                <Card sx={{ maxWidth: 345, }} style={cardStyle}  >
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        image={product.image}
                                        title="green iguana"
                                        onClick={() => onClickHandler(product.id)}
                                    />
                                    <CardContent sx={{ height: 120 }}>
                                        <Typography variant="h6">{product.title}</Typography>
                                        <Typography variant="body1">{product.price}</Typography>
                                        <Typography variant="body1">{product.rating.rate}</Typography>

                                        <Rating name="product-rating" value={Math.floor(product.rating.rate)} precision={0.5} readOnly />
                                    </CardContent>

                                </Card>
                            </Grid>

                        ))}
                    </Grid>
                </Container>


            </Grid>
            <Stack spacing={2} sx={{ alignItems: "center", my: 6 }} >

                <Pagination count={Math.ceil(products.length / pageSize)}
                    page={currentPage}
                    onChange={handlePageChange} />

            </Stack>

        </>
    )
}

export default ProductList
