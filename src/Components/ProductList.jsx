import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Actions/Actions'
import { Card, CardContent, CardMedia, Container, Divider, Grid, Pagination, Rating, Stack, Typography } from '@mui/material'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import CategoryList from './CategoryList'


function ProductList() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])

    useEffect(() => {
        dispatch(getProducts())

    }, [])

    const { products } = useSelector((state) => state.products)

    const onClickHandler = (id) => {

        navigate(`/product/${id}`)

    }

    const pageSize = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };


    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.6s',
        cursor: 'pointer',
    };
    return (
        <>
            <Navbar products={products} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Typography variant='h6' sx={{ mt: { md: 8, xs: 2 }, color: '#353236', fontWeight: 'bold', fontFamily: "serif", fontSize: '1.5rem' }}>
                            Filters
                        </Typography>
                        <CategoryList changeCategory={(category) => setCategory(category)} />
                    </Grid>
                </Grid>



                <Grid item xs={12} md={9}>
                    <Container sx={{ mt: 8 }}>
                        <Grid container spacing={2}>
                            {products.filter((product) => category.length === 0 || category.some((cat) => product.category.includes(cat))).slice(startIndex, endIndex).map((product) => (
                                <Grid item xs={12} sm={6} md={4} key={product.id}>
                                    <Card sx={{ maxWidth: 345 }} style={cardStyle}>
                                        <CardMedia
                                            sx={{ height: 200 }}
                                            image={product.image}
                                            title="product Images"

                                            onClick={() => onClickHandler(product.id)}
                                        />
                                        <CardContent sx={{ height: 110, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <Rating name="product-rating" value={Math.floor(product.rating.rate)} precision={0.5} readOnly />
                                            <Typography variant="h7" sx={{ mt: 1, mb: 1 }}>{product.title}</Typography>
                                            <Typography variant="body1">{product.price}</Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Grid>
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
