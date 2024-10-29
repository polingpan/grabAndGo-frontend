import {Box, Button, Typography} from '@mui/material'
import {alpha, useTheme} from '@mui/material/styles'
import {useState} from 'react'
import ProductDialog from './ProductDialogTemp'
import {useDispatch} from 'react-redux'
import {addProduct} from '../actions/product/productAction'

function AddProduct() {
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [pickUpTimeFrom, setPickUpTimeFrom] = useState('')
    const [pickUpTimeUntil, setPickUpTimeUntil] = useState('')
    const [availableDays, setAvailableDays] = useState([])

    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'
    const dispatch = useDispatch()

    const handleAddProductOpen = () => {
        setOpenAddProduct(true)
    }

    const handleAddProductClose = () => {
        setOpenAddProduct(false)
        setProductName('')
        setProductPrice('')
        setProductQuantity('')
        setProductDescription('')
        setPickUpTimeFrom('')
        setPickUpTimeUntil('')
        setAvailableDays([])
    }

    const handleFieldChange = (field, value) => {
        switch (field) {
            case 'productName':
                setProductName(value)
                break
            case 'productPrice':
                setProductPrice(value)
                break
            case 'productQuantity':
                setProductQuantity(value)
                break
            case 'productDescription':
                setProductDescription(value)
                break
            case 'pickUpTimeFrom':
                setPickUpTimeFrom(value)
                break
            case 'pickUpTimeUntil':
                setPickUpTimeUntil(value)
                break
            default:
                console.warn(`Unknown field: ${field}`)
        }
    }

    const handleDayChange = day => {
        setAvailableDays(prevDays => (prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]))
    }

    const handleSave = () => {
        const productData = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity, 10),
            description: productDescription,
            pickUpTimeFrom,
            pickUpTimeUntil,
            availableDays
        }

        dispatch(addProduct(productData))

        handleAddProductClose()
    }

    return (
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
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1)
                    }
                }}
                onClick={handleAddProductOpen}
            >
                新增商品
            </Button>
            <ProductDialog
                mode="create"
                open={openAddProduct}
                onClose={handleAddProductClose}
                title="新增商品"
                productName={productName}
                productPrice={productPrice}
                productQuantity={productQuantity}
                productDescription={productDescription}
                pickUpTimeFrom={pickUpTimeFrom}
                pickUpTimeUntil={pickUpTimeUntil}
                availableDays={availableDays}
                onFieldChange={handleFieldChange}
                onDayChange={handleDayChange}
                onSave={handleSave}
                isDarkMode={isDarkMode}
                theme={theme}
            />
        </Box>
    )
}

export default AddProduct
