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
    FormControlLabel, Checkbox, FormGroup

} from '@mui/material'
import {alpha, useTheme} from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import * as React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import axiosInstance from '../axiosConfig'
import {TimePicker} from '@mui/x-date-pickers'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

function ProductsCard({min = 1, max = 100}) {
    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'

    const [products, setProducts] = useState([])
    const [openEditProducts, setOpenEditProducts] = useState(false)
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [editedName, setEditedName] = useState('')
    const [editedPrice, setEditedPrice] = useState('')
    const [editedQuantity, setEditedQuantity] = useState('')
    const [editedPickUpTimeFrom, setEditedPickUpTimeFrom] = useState('')
    const [editedPickUpTimeUntil, setEditedPickUpTimeUntil] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editedAvailableDays, setEditedAvailableDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    })

    const handleDayChange = (day) => {
        setEditedAvailableDays((prevDays) => ({
            ...prevDays,
            [day]: !prevDays[day]
        }))
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products')
                setProducts(response.data.products)
            } catch (err) {
                console.error('Error fetching products:', err)
            }
        }

        fetchProducts()
    }, [])


    const handleClickOpen = (product, index) => {
        const productId = product._id
        setCurrentProduct({
            index,
            productId
        })
        setEditedName(product.name)
        setEditedPrice(product.price)
        setEditedQuantity(product.quantity)
        setEditedPickUpTimeFrom(product.pickUpTimeFrom)
        setEditedPickUpTimeUntil(product.pickUpTimeUntil)
        setEditedDescription(product.description)
        const newAvailableDays = {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }

        product.availableDays.forEach((day) => {
            newAvailableDays[day.toLowerCase()] = true
        })

        setEditedAvailableDays(newAvailableDays)
        setOpenEditProducts(true)
        console.log(productId)
    }

    const handleClose = () => {
        setOpenEditProducts(false)
        setCurrentProduct(null)
    }

    const handleSave = () => {
        const updatedProducts = [...products]
        updatedProducts[currentProduct] = {name: editedName, price: editedPrice, description: editedDescription}
        setProducts(updatedProducts)
        handleClose()
    }

    const deleteProduct = async (productId) => {
        console.log(productId)
        try {

            const response = await axiosInstance.delete(`/products/${productId}`)

            console.log(response.data.message)
            setOpenDeleteConfirm(false)
            return response.data

        } catch (error) {
            console.error('Failed to delete product:', error.response?.data || error.message)
            throw error
        }
    }

    const handleDeleteOpen = () => {
        setOpenDeleteConfirm(true)
    }

    const handleDeleteClose = () => {
        setOpenDeleteConfirm(false)
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

            <Dialog open={openEditProducts} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">編輯商品</DialogTitle>
                <DialogContent sx={{width: '490px'}}>
                    <Box sx={{display: 'flex', gap: 2, width: '440px'}}>
                        <TextField
                            margin="dense"
                            label="商品名稱"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{display: 'flex', gap: 2, justifyContent: 'flexStart'}}>
                        <TextField
                            margin="dense"
                            label="價格"
                            value={editedPrice}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            onChange={(e) => setEditedPrice(e.target.value)}
                            sx={{width: '212px'}}
                        />
                        <TextField
                            margin="dense"
                            label="數量"
                            value={editedQuantity}
                            onChange={(e) => setEditedQuantity(e.target.value)}
                            type="number"
                            inputProps={{min, max}}
                            sx={{width: '212px'}}
                        />
                    </Box>
                    <TextField
                        margin="dense"
                        label="商品敘述"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        sx={{marginBottom: '1rem', width: '440px'}}
                    />
                    <Box sx={{display: 'flex', gap: 2}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="最早可取貨時間"
                                value={dayjs(editedPickUpTimeFrom)}
                                onChange={(newValue) => setEditedPickUpTimeFrom(newValue)}

                            />
                            <TimePicker
                                label="最晚可取貨時間"
                                value={dayjs(editedPickUpTimeUntil)}
                                onChange={(newValue) => setEditedPickUpTimeUntil(newValue)}

                            />
                        </LocalizationProvider>
                    </Box>

                    {/* Day selection checkboxes */}
                    <Typography variant="subtitle1" sx={{mt: 2}}>
                        選擇可取貨日期
                    </Typography>
                    <FormGroup
                        row
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                        }}
                    >
                        {Object.keys(editedAvailableDays).map((day) => (
                            <Box key={day} sx={{width: '120px'}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={editedAvailableDays[day]}
                                            onChange={() => handleDayChange(day)}
                                            name={day}
                                            color="primary"
                                        />
                                    }
                                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                                />
                            </Box>
                        ))}
                    </FormGroup>

                </DialogContent>

                <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        sx={{backgroundColor: isDarkMode ? theme.palette.error.light : '#FAEBEA', color: '#D02435'}}
                        onClick={handleDeleteOpen}
                    >
                        刪除商品
                    </Button>
                    <Box>
                        <Button onClick={handleClose} sx={{
                            backgroundColor: isDarkMode ? 'hsl(220, 20%, 42%)' : '#E0E0E0',
                            color: '#424242'
                        }}>返回</Button>
                        <Button onClick={handleSave}
                                sx={{
                                    backgroundColor: isDarkMode ? theme.palette.success.light : '#E8F5E9',
                                    color: '#2E7D32',
                                    marginLeft: '0.5rem'
                                }}>
                            儲存
                        </Button>
                    </Box>

                </DialogActions>
            </Dialog>
            <Dialog open={openDeleteConfirm} onClose={handleDeleteClose} aria-labelledby="delete-confirm-dialog">
                <DialogTitle id="delete-confirm-dialog">確認刪除商品</DialogTitle>
                <DialogContent>
                    <Typography>您確定要刪除此商品嗎？</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}
                            sx={{backgroundColor: isDarkMode ? 'hsl(220, 20%, 42%)' : '#E0E0E0'}}>取消</Button>
                    <Button
                        onClick={() => deleteProduct(currentProduct.productId)}
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
