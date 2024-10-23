import {useRef, useEffect, useState} from 'react'
import CallIcon from '@mui/icons-material/Call'
import PlaceIcon from '@mui/icons-material/Place'
import EditIcon from '@mui/icons-material/Edit'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import './businessSignUp.scss'

function BusinessSignUp() {
    const autocompleteRef = useRef(null)
    const [storeDetails, setStoreDetails] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [mapUrl, setMapUrl] = useState(null) // State to hold the static map URL
    const [editMode, setEditMode] = useState(false) // Edit mode state
    const [editableDetails, setEditableDetails] = useState({name: '', address: '', phone: ''}) // Editable details state

    useEffect(() => {
        const loadScript = url => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.src = url
                script.async = true
                script.defer = true
                script.onload = resolve
                script.onerror = reject
                document.head.appendChild(script)
            })
        }

        const loadGoogleMaps = async () => {
            try {
                await loadScript(
                    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&language=zh-TW`
                )
                initializeAutocomplete()
            } catch (error) {
                console.error('Error loading Google Maps script:', error)
            }
        }

        const initializeAutocomplete = () => {
            if (autocompleteRef.current) {
                const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
                    types: ['establishment'] // Restrict to business establishments
                })

                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace()
                    console.log('Selected place:', place)

                    // Extract details from the selected place
                    const store = {
                        name: place.name || 'N/A',
                        address: place.formatted_address || 'N/A',
                        phone: place.formatted_phone_number || 'N/A',
                        location: place.geometry?.location // Get the location of the place
                    }

                    setStoreDetails(store) // Save the store details in state

                    // Generate the static map URL
                    const lat = store.location.lat()
                    const lng = store.location.lng()
                    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=800x400&scale=2&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

                    setMapUrl(staticMapUrl) // Set the map image URL
                    setEditableDetails(store) // Set the editable details
                    setIsDialogOpen(true) // Open the dialog
                })
            }
        }

        loadGoogleMaps()
    }, [])

    const closeDialog = () => {
        setIsDialogOpen(false)
        setEditMode(false) // Exit edit mode when closing
    }

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleSave = () => {
        setStoreDetails(editableDetails) // Update the store details with editable data
        setEditMode(false) // Exit edit mode
    }

    const handleChange = e => {
        const {name, value} = e.target
        setEditableDetails(prev => ({...prev, [name]: value}))
    }

    return (
        <div className="pageWrapper">
            <div className="leftSection">
                <div className="formContainer">
                    <h2 className="heading">註冊您的商家</h2>

                    <div id="place-picker-box">
                        <div id="place-picker-container" style={{textAlign: 'left'}}>
                            <input
                                ref={autocompleteRef}
                                id="place-picker"
                                placeholder="搜尋您的商店"
                                className="input"
                            />
                        </div>
                    </div>
                </div>
                <div className="privacy">
                    <p>繼續即表示您同意 GRAB & GO 的隱私政策和條款與條件。</p>
                    <p>
                        已經有商店帳戶了嗎？<a href="/login">登入</a>
                    </p>
                </div>
            </div>

            <div className="rightSection">
                <img src="/grabAndGo.svg" alt="Visual" className="image" />
            </div>

            {isDialogOpen && (
                <>
                    <div className="overlay"></div>
                    {/* Overlay to blur the background */}
                    <dialog open className="dialog">
                        <h3 className="dialogHeading">確認您的商店資料</h3>

                        <div className="detailsItemContainer">
                            <div className="detailsItem">
                                <strong>{editableDetails.name}</strong>
                            </div>

                            <div className="detailsItem">
                                <PlaceIcon fontSize="small" />
                                {!editMode ? (
                                    <p>{editableDetails.address}</p>
                                ) : (
                                    <input
                                        type="text"
                                        name="address"
                                        value={editableDetails.address}
                                        onChange={handleChange}
                                        className="inputField"
                                    />
                                )}
                            </div>

                            <div className="detailsItem">
                                <CallIcon fontSize="small" />
                                {!editMode ? (
                                    <p>{editableDetails.phone}</p>
                                ) : (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editableDetails.phone}
                                        onChange={handleChange}
                                        className="inputField"
                                    />
                                )}
                            </div>

                            {mapUrl && <img src={mapUrl} alt="Store Location" className="mapImg" />}
                        </div>

                        <div className="btnContainer">
                            {!editMode ? (
                                <button className="editButton" onClick={handleEdit}>
                                    <EditIcon fontSize="small" />
                                    <p>編輯</p>
                                </button>
                            ) : (
                                <button className="saveButton" onClick={handleSave}>
                                    <SaveOutlinedIcon fontSize="small" />
                                    <p>儲存</p>
                                </button>
                            )}

                            <button className="closeButton" onClick={closeDialog}>
                                繼續
                            </button>
                        </div>
                    </dialog>
                </>
            )}
        </div>
    )
}

export default BusinessSignUp
