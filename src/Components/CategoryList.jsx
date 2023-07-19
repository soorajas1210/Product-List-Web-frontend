import { Box, Checkbox, Paper, Typography } from '@mui/material'
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
            {categories.map((category) => (
                <Box key={category} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={handleCategoryToggle(category)}
                    />
                    <Typography variant="body1">{category}</Typography>
                </Box>
            ))}
        </Paper>
    )
}

export default CategoryList
