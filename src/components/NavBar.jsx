function NavBar(){
    return(
        <nav className="NavBar">
            <div className="NavBar-container">
                <ul className = "NavBar-menu left">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#categories">Categories</a></li>
                    <li><a href="#about">About</a></li>
                </ul>

                <a href="#" onClick={()=>window.location.reload()} className="logo-center">
                    <img src="/images/logo.png" className="logo" alt="PMHub"/>
                </a>

                <ul className = "NavBar-menu right">
                    <li><a href="#testimonals">Testimonals</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#profile">Profile</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;