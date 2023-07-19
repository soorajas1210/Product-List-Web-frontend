import { Button, Card, CardContent, CardMedia, Container, Dialog, DialogContent, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProducts } from '../Actions/Actions'
import Navbar from './Navbar'

function Product() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())

    }, [])
    const { products } = useSelector((state) => state.products)

    const { id } = useParams()

    const data = products.filter((product) => String(product.id) === id)
    const product = Object.assign({}, ...data);

    const [zoom, setzoom] = useState(false);
    const handleClick = () => {
        setzoom(true);
    }
    const handleClose = () => {
        setzoom(false);
    }

    return (
        <>
            <Navbar products={products} />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Paper sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <CardMedia component="img" height="400" image={product.image} alt={product.title} style={{ cursor: "pointer" }} onClick={handleClick} />
                            <Dialog open={zoom} onClose={handleClose}>
                                <DialogContent >
                                    <CardMedia component="img" image={product.image} alt={product.title} />
                                </DialogContent>
                            </Dialog>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    {product.title}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    {product.price}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {product.description}
                                </Typography>
                                <Button variant="contained" color="primary">
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}

export default Product
