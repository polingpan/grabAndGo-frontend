import React, {useEffect} from 'react'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {setOrdersSearchTerm} from '../../actions/businessUser/businessUserAction'
import useDebounce from '../../helper/useDebounce'

export default function Search() {
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState('')
    const debouncedSearchTerm = useDebounce(searchInput, 500)
    const handleSearchChange = event => {
        setSearchInput(event.target.value)
    }

    useEffect(() => {
        dispatch(setOrdersSearchTerm(debouncedSearchTerm))
    }, [debouncedSearchTerm, dispatch])

    return (
        <FormControl sx={{width: {xs: '100%', md: '25ch'}}} variant="outlined">
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Search…"
                sx={{flexGrow: 1}}
                startAdornment={
                    <InputAdornment position="start" sx={{color: 'text.primary'}}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search'
                }}
                onChange={handleSearchChange}
            />
        </FormControl>
    )
}
