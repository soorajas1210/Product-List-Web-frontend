import { Box, Checkbox, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryList } from '../Actions/Actions'

function CategoryList(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategoryList())
    }, [])



    const [selectedCategories, setSelectedCategories] = useState([]);
    useEffect(() => {
        props.changeCategory(selectedCategories)
    }, [selectedCategories])
    const { categories } = useSelector((state) => state.categories)

    const handleCategoryToggle = (category) => () => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prevSelected) => prevSelected.filter((item) => item !== category));

        } else {
            setSelectedCategories((prevSelected) => [...prevSelected, category]);

        }
    };

    return (
        <Paper variant="outlined" sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
            <Typography variant='h5' align='center' > Categories  </Typography>
            <Grid item>
                <Divider sx={{ width: '100%', borderTop: '1px solid #ccc', mt: 2 }} />
            </Grid>
            {categories.map((category) => (
                <Grid item key={category} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box >
                        <Checkbox
                            checked={selectedCategories.includes(category)}
                            onChange={handleCategoryToggle(category)}
                        />
                    </Box>
                    <Typography variant="body1">{category}</Typography>
                </Grid>
            ))}
        </Paper>
    )
}

export default CategoryList
