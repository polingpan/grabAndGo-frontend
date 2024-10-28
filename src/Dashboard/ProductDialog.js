import React from 'react'
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import {LocalizationProvider, TimePicker} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

function ProductDialog({
    mode = 'edit',
    title = mode === 'edit' ? '編輯商品' : '新增商品',
    open,
    onClose,
    productName,
    productPrice,
    productQuantity,
    productDescription,
    pickUpTimeFrom,
    pickUpTimeUntil,
    availableDays,
    onFieldChange,
    onDayChange,
    onSave,
    onDelete,
    isDarkMode,
    theme,
    min,
    max
}) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="edit-product-dialog">
            <DialogTitle id="edit-product-dialog">{title}</DialogTitle>
            <DialogContent sx={{width: '490px'}}>
                <Box sx={{display: 'flex', gap: 2, width: '440px'}}>
                    <TextField
                        margin="dense"
                        label="商品名稱"
                        value={productName}
                        onChange={e => onFieldChange('productName', e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box sx={{display: 'flex', gap: 2}}>
                    <TextField
                        margin="dense"
                        label="價格"
                        value={productPrice}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        onChange={e => onFieldChange('productPrice', e.target.value)}
                        sx={{width: '212px'}}
                    />
                    <TextField
                        margin="dense"
                        label="數量"
                        value={productQuantity}
                        onChange={e => onFieldChange('productQuantity', e.target.value)}
                        type="number"
                        inputProps={{min, max}}
                        sx={{width: '212px'}}
                    />
                </Box>
                <TextField
                    margin="dense"
                    label="商品敘述"
                    value={productDescription}
                    onChange={e => onFieldChange('productDescription', e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                    sx={{marginBottom: '1rem', width: '440px'}}
                />
                <Box sx={{display: 'flex', gap: 2}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="最早可取貨時間"
                            value={dayjs(pickUpTimeFrom)}
                            onChange={newValue => onFieldChange('pickUpTimeFrom', newValue)}
                        />
                        <TimePicker
                            label="最晚可取貨時間"
                            value={dayjs(pickUpTimeUntil)}
                            onChange={newValue => onFieldChange('pickUpTimeUntil', newValue)}
                        />
                    </LocalizationProvider>
                </Box>
                <Typography variant="subtitle1" sx={{mt: 2}}>
                    選擇可取貨日期
                </Typography>
                <FormGroup row>
                    {daysOfWeek.map(day => (
                        <Box key={day} sx={{width: '120px'}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={availableDays.includes(day)}
                                        onChange={() => onDayChange(day)}
                                        color="primary"
                                    />
                                }
                                label={day}
                            />
                        </Box>
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                {mode === 'edit' ? (
                    <Button
                        onClick={onDelete}
                        sx={{backgroundColor: isDarkMode ? theme.palette.error.light : '#FAEBEA', color: '#D02435'}}
                    >
                        刪除商品
                    </Button>
                ) : (
                    <Box sx={{width: '105px'}} />
                )}
                <Box>
                    <Button
                        onClick={onClose}
                        sx={{
                            backgroundColor: isDarkMode ? 'hsl(220, 20%, 42%)' : '#E0E0E0',
                            color: '#424242'
                        }}
                    >
                        返回
                    </Button>
                    <Button
                        onClick={onSave}
                        sx={{
                            backgroundColor: isDarkMode ? theme.palette.success.light : '#E8F5E9',
                            color: '#2E7D32',
                            marginLeft: '0.5rem'
                        }}
                    >
                        儲存
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default ProductDialog
