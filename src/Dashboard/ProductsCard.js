import {useState} from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    TextField, Input
} from '@mui/material'
import {alpha, useTheme} from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import * as React from 'react'
import InputAdornment from '@mui/material/InputAdornment'

const initialProductsData = [
    {name: '烘焙食品', price: '100'},
    {name: '驚喜盲盒', price: '150'},
    {name: '飲品', price: '100'}
]

function ProductsCard() {
    const theme = useTheme()
    const [products, setProducts] = useState(initialProductsData)
    const [openEditProducts, setOpenEditProducts] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [editedName, setEditedName] = useState('')
    const [editedPrice, setEditedPrice] = useState('')

    const handleClickOpen = (product, index) => {
        setCurrentProduct(index)
        setEditedName(product.name)
        setEditedPrice(product.price)
        setOpenEditProducts(true)
    }

    const handleClose = () => {
        setOpenEditProducts(false)
        setCurrentProduct(null)
    }

    const handleSave = () => {
        const updatedProducts = [...products]
        updatedProducts[currentProduct] = {name: editedName, price: editedPrice}
        setProducts(updatedProducts)
        handleClose()
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

            <Dialog
                open={openEditProducts}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    編輯商品
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="商品名稱"
                        fullWidth
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="價格"
                        fullWidth
                        value={editedPrice}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }
                        }}
                        onChange={(e) => setEditedPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        返回
                    </Button>
                    <Button onClick={handleSave} autoFocus>
                        儲存
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ProductsCard
