import {useState, useEffect} from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    FormGroup
} from '@mui/material'
import {alpha, useTheme} from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import * as React from 'react'
import ProductDialog from './ProductDialogTemp'
import {useDispatch} from 'react-redux'
import {deleteProduct, editProduct} from '../actions/product/productAction'

function ProductsCard({products}) {
    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'

    const [openEditProducts, setOpenEditProducts] = useState(false)
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [pickUpTimeFrom, setPickUpTimeFrom] = useState('')
    const [pickUpTimeUntil, setPickUpTimeUntil] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [availableDays, setAvailableDays] = useState([])
    const dispatch = useDispatch()

    const handleDayChange = day => {
        setAvailableDays(prevDays => (prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]))
    }

    const handleClickOpen = (product, index) => {
        const productId = product._id
        setCurrentProduct({
            index,
            productId
        })
        setProductName(product.name)
        setProductPrice(product.price)
        setProductQuantity(product.quantity)
        setPickUpTimeFrom(product.pickUpTimeFrom)
        setPickUpTimeUntil(product.pickUpTimeUntil)
        setProductDescription(product.description)
        const newAvailableDays = product.availableDays.map(day => day)

        setAvailableDays(newAvailableDays)
        setOpenEditProducts(true)
    }

    const handleClose = () => {
        setOpenEditProducts(false)
        setCurrentProduct(null)
    }

    const handleSave = () => {
        const updatedData = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity, 10),
            description: productDescription,
            pickUpTimeFrom,
            pickUpTimeUntil,
            availableDays
        }

        dispatch(editProduct(currentProduct.productId, updatedData))
        handleClose()
    }

    const handleDeleteProduct = productId => {
        dispatch(deleteProduct(productId))
        setOpenDeleteConfirm(false)
        setCurrentProduct(null)
        setOpenEditProducts(false)
    }

    const handleDeleteOpen = () => {
        setOpenDeleteConfirm(true)
    }

    const handleDeleteClose = () => {
        setOpenDeleteConfirm(false)
    }

    const setField = (field, value) => {
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
            case 'pickUpTimeFrom':
                setPickUpTimeFrom(value)
                break
            case 'pickUpTimeUntil':
                setPickUpTimeUntil(value)
                break
            case 'productDescription':
                setProductDescription(value)
                break
            default:
                console.warn(`Unknown field: ${field}`)
        }
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 2
            }}
        >
            {products.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'relative',
                        border: `1px solid ${theme.palette.divider}`,
                        padding: 2,
                        borderRadius: '8px',
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        color: theme.palette.text.primary,
                        boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
                        '&:hover': {
                            boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`
                        }
                    }}
                >
                    <EditIcon
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            cursor: 'pointer',
                            color: theme.palette.text.secondary
                        }}
                        fontSize="small"
                        onClick={() => handleClickOpen(item, index)}
                    />
                    <Typography variant="subtitle1" sx={{fontWeight: 500}}>
                        {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{mt: 0.5, color: theme.palette.text.secondary}}>
                        ${item.price}
                    </Typography>
                </Box>
            ))}
            <ProductDialog
                mode="edit"
                open={openEditProducts}
                onClose={handleClose}
                product={currentProduct}
                productName={productName}
                productPrice={productPrice}
                productQuantity={productQuantity}
                productDescription={productDescription}
                pickUpTimeFrom={pickUpTimeFrom}
                pickUpTimeUntil={pickUpTimeUntil}
                availableDays={availableDays}
                onFieldChange={(field, value) => setField(field, value)}
                onDayChange={handleDayChange}
                onSave={handleSave}
                onDelete={handleDeleteOpen}
                isDarkMode={isDarkMode}
                theme={theme}
            />
            <Dialog open={openDeleteConfirm} onClose={handleDeleteClose} aria-labelledby="delete-confirm-dialog">
                <DialogTitle id="delete-confirm-dialog">確認刪除商品</DialogTitle>
                <DialogContent>
                    <Typography>您確定要刪除此商品嗎？</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDeleteClose}
                        sx={{backgroundColor: isDarkMode ? 'hsl(220, 20%, 42%)' : '#E0E0E0'}}
                    >
                        取消
                    </Button>
                    <Button
                        onClick={() => handleDeleteProduct(currentProduct.productId)}
                        sx={{backgroundColor: isDarkMode ? theme.palette.error.light : '#FAEBEA', color: '#D02435'}}
                    >
                        確認刪除
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ProductsCard
