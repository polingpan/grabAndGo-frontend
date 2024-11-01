import * as React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import './test.scss'
import {useDispatch} from 'react-redux'
import {setDateSelection} from '../../actions/businessUser/businessUserAction'

function ButtonField(props) {
    const {setOpen, label, id, disabled, InputProps: {ref} = {}, inputProps: {'aria-label': ariaLabel} = {}} = props
    return (
        <Button
            variant="outlined"
            id={id}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            size="small"
            onClick={() => setOpen?.(prev => !prev)}
            startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
            sx={{minWidth: 'fit-content'}}
        >
            {label ? `${label}` : 'Pick a date'}
        </Button>
    )
}

ButtonField.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    inputProps: PropTypes.shape({
        'aria-label': PropTypes.string
    }),
    InputProps: PropTypes.shape({
        endAdornment: PropTypes.node,
        startAdornment: PropTypes.node
    }),
    label: PropTypes.node,
    setOpen: PropTypes.func
}

export default function CustomDatePicker() {
    const [value, setValue] = React.useState([])
    const [open, setOpen] = React.useState(false)

    const dispatch = useDispatch()

    const handleChange = newValue => {
        setValue(newValue)
        if (newValue[0] && newValue[1]) {
            dispatch(setDateSelection(newValue[0], newValue[1]))
        } else {
            dispatch(setDateSelection(null, null)) // Clear selection in Redux state
        }
    }

    const handleClear = () => {
        setValue([])
        dispatch(setDateSelection(null, null)) // Dispatch action to clear the selection in Redux
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
                value={value}
                onChange={handleChange}
                slots={{field: ButtonField}}
                slotProps={{
                    field: {
                        setOpen,
                        label:
                            value[0] && value[1]
                                ? `${value[0].format('MMM DD, YYYY')} - ${value[1].format('MMM DD, YYYY')}`
                                : 'Select date range'
                    }
                }}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                calendars={2}
                maxDate={dayjs()}
            />
            {value[0] && value[1] && (
                <Button
                    onClick={handleClear}
                    variant="outlined"
                    size="small"
                    sx={{fontSize: 'small', minWidth: 'fit-content'}}
                >
                    Clear Date
                </Button>
            )}
        </LocalizationProvider>
    )
}
