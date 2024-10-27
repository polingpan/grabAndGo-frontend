import * as React from 'react'
import {Box, Button, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import {alpha, useTheme} from '@mui/material/styles'
import {useState} from 'react'
import ProductsCard from './ProductsCard'

const productsData = [
    {name: '烘焙食品', price: '$100'},
    {name: '驚喜盲盒', price: '$150'},
    {name: '飲品', price: '$100'}
]

function Home() {
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const theme = useTheme()

    const handleAddProductOpen = () => {
        setOpenAddProduct(true)
    }

    const hanldeAddProductClose = () => {
        setOpenAddProduct(false)
    }
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, padding: 2}}>
            <Typography variant="h5" sx={{mb: 2, color: theme.palette.text.primary}}>
                您的商品
            </Typography>

            <ProductsCard />
            <Box
                sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                    mt: 3,
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    boxShadow: `0 1px 4px ${alpha(theme.palette.common.black, 0.1)}`
                }}
            >
                <Typography variant="body1" sx={{mb: 1}}>
                    您目前沒有可販售的商品
                </Typography>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: theme.palette.divider,
                        color: theme.palette.primary.main
                        // '&:hover': {
                        //     backgroundColor: alpha(theme.palette.primary.main, 0.1)
                        // }
                    }}
                    onClick={handleAddProductOpen}
                >
                    新增商品
                </Button>
            </Box>
        </Box>
    )
}

export default Home
