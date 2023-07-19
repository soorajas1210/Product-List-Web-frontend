import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ products }) {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };
    const toHome = () => {
        navigate('/')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: '#f2f7f7' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="black"
                        aria-label="open drawer"
                        sx={{
                            mr: 2,
                            display: { xs: 'block', sm: 'block', md: 'none', },
                        }}
                    >
                        <MenuIcon onClick={toHome} />
                    </IconButton>
                    <Typography sx={{
                        mr: 2,
                        display: { flexGrow: 1, xs: 'block', sm: 'block', md: 'none', },
                    }} ></Typography>
                    <Typography
                        variant="h6"
                        color="black"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' }, }}
                        style={{ cursor: "pointer" }}
                        onClick={toHome}
                    >
                        {"Home"}
                    </Typography>

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={products.map((product) => ({
                            title: product.title,
                            id: Number(product.id),
                        }))}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, value) => {
                            if (value) {
                                handleClick(value.id);
                            }
                        }}
                        sx={{
                            width: { xs: 200, sm: 400 },
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                                borderRadius: 4,
                                height: '37px',
                                position: 'relative',
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 4,
                                height: '37px',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'gray',
                            },
                            '& .MuiAutocomplete-option': {
                                lineHeight: '1.5rem',
                            },
                        }}

                        renderInput={(params) => <TextField  {...params} label="Search..."
                            InputLabelProps={{
                                style: { marginTop: '-8px' },
                            }} />}



                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
