import React from "react";
import styles from "./AboutUs.module.css";
import myImage from './/photos/icon.jpg';
function AboutUs(){
    return(
        <div className= {styles.card}>
        <header>
            <h1>AutoCare</h1>
            <img src={myImage} alt="AutoCare Icon" className={styles.logo}/>
            <nav className={styles.links}>
                <a href="signup.html">Sign Up</a>
                <a href="login.html">Log In</a>
            </nav>
        </header>
    </div>
    );
}

export default AboutUs;