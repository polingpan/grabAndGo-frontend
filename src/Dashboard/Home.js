import * as React from 'react'
import {Box, Typography} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {useEffect} from 'react'
import ProductsCard from './ProductsCard'
import AddProduct from './AddProduct'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProducts} from '../actions/product/productAction'

function Home() {
    const theme = useTheme()
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, padding: 2}}>
            <Typography variant="h5" sx={{mb: 2, color: theme.palette.text.primary}}>
                您的商品
            </Typography>
            {products.length > 0 ? <ProductsCard products={products} /> : <AddProduct />}
        </Box>
    )
}

export default Home
