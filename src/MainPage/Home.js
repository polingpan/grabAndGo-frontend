import './home.scss'
import {useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'

function Home() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true) // Change the state when the page is scrolled
            } else {
                setIsScrolled(false) // Reset the state when at the top
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll) // Cleanup on component unmount
        }
    }, [])

    return (
        <div className="home">
            <header className={`homeHeader ${isScrolled ? 'scrolled' : ''}`}>
                <div className="headerContent">
                    <nav className="navbar">
                        <ul className="navLinks">
                            <li>
                                <a href="#about">關於我們</a>
                            </li>
                            <li>
                                <a href="#how-it-works">BUSINESS SOLUTIONS</a>
                            </li>
                            <li>
                                <a href="#contact">聯絡我們</a>
                            </li>
                        </ul>
                        <div className="logoContainer">
                            <img src="/logo3.png" alt="Business Logo" className="logo"/>
                        </div>
                        <div className="signUpBtnContainer">
                            <button className="signUpBtn">
                                下載 GRAB & GO APP
                                <span className="arrow">→</span>
                            </button>
                            <a href="/create-account">
                                <button className="signUpBtn">
                                    商家註冊
                                    <span className="arrow">→</span>
                                </button>
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="sectionContainer">
                <div className="section">
                    <span>123</span>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <span>123</span>
                </div>
            </section>
            <section className="tryNow">
                <div className="tryNowContainer">
                    <Box className="tryItNow">
                        <h3>Contribute to protecting the environment by minimizing food waste.</h3>
                        <h1>Try It Now</h1>
                        <Box className="downloadBtn">
                            <Button>
                                <img src="/appStore.svg" alt=""/>
                            </Button>
                            <Button>
                                <img src="/googlePlay.png" alt=""/>
                            </Button>
                        </Box>
                    </Box>
                    <img
                        src="https://cdn.prod.website-files.com/65562a444fb2baf4bb391d43/659d7049c2ef889a5280cdf3__Mobile%20Mockups_-EN.webp"
                        alt=""
                        className="appImg"
                    />
                    <Box className="steps">
                        <Box className="steps_1">
                            <h2>STEP ONE</h2>
                            <Typography>Download the app</Typography>
                        </Box>
                        <Box className="steps_2">
                            <h2>STEP TWO</h2>
                            <Typography>
                                Explore Surprise Bags offered by local stores and restaurants nearby.
                            </Typography>
                        </Box>
                        <Box className="steps_3">
                            <h2>STEP THREE</h2>
                            <Typography>Head to the shop and pick up your order</Typography>
                        </Box>
                    </Box>
                </div>
            </section>
            <section className="sectionContainer">
                <div className="section">
                    <span>123</span>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <h1>123</h1>
                    <span>123</span>
                </div>
            </section>
        </div>
    )
}

export default Home
