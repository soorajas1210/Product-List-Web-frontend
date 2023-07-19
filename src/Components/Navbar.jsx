import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    color: "black",
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Navbar({ products }) {

    const navigate = useNavigate()
    const handleClick = (id) => {
        console.log(id)
        navigate(`/product/${id}`)

    }

    return (
        <Box sx={{ flexGrow: 1 }}  >
            <AppBar position="static" style={{ backgroundColor: "#e6e8e7" }} >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="black"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >

                    </Typography>

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={products.map((product) => ({ title: product.title, id: Number(product.id) }))}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, value) => {
                            if (value) {
                                // Perform your desired action with the selected option's ID
                                handleClick(value.id);
                            }
                        }}
                        sx={{
                            width: 300,
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                                borderRadius: 4,
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 4,
                            },
                            '& .MuiInputLabel-root': {
                                color: 'gray',
                            },
                            '& .MuiAutocomplete-option': {
                                color: 'black',
                            },
                        }}
                        renderInput={(params) => <TextField {...params} label="Search..." />}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}