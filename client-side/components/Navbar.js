import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import axios from 'axios';

const Navbar = () => {
        const router = useRouter();
        const [names, setName] = useState("");
        const [category, setCategory] = useState("");
        const [state, setState] = useState("");
        const [city, setCity] = useState("");
        const [uid, setUid] = useState(null);
      
        const handleSubmit = (e) => {
            e.preventDefault();
            let encodedName = encodeURIComponent(names ? names.trim() : "");
            let encodedCategory = encodeURIComponent(category ? category.trim() : "");
            let encodedState = encodeURIComponent(state ? state.trim() : "");
            let encodedCity = encodeURIComponent(city ? city.trim() : "");
        
            // console.log(encodedName);
            // console.log(encodedCategory);
            // console.log(encodedState);
            // console.log(encodedCity);

            let url_base = `http://localhost:8000/business/search?`;
            let nameparam = encodedName ? `name=${encodedName}` : "";
            let categoryparam = encodedCategory ? `&category=${encodedCategory}` : "";
            let stateparam = encodedState ? `&state=${encodedState}` : "";
            let cityparam = encodedCity ? `&city=${encodedCity}` : "";
            let url = url_base + nameparam + categoryparam + stateparam + cityparam;

            window.location.href = url;
        };

        useEffect(() => {
            const fetchownuid = async () => {
                if (router.isReady) {
                    try {
                        const response = await axios.get(`http://localhost:3000/api/userProfile/getuseruid`,{ withCredentials: true }); 
                        setUid(response.data.uid);
                    } catch (error) {
                        console.error(error);
                    }
                }
            };
            fetchownuid();
        }, [router.isReady]);

        const handleLogout = async () => {
            const response = await axios.delete('http://localhost:3000/api/auth/logout', {withCredentials: true});

            alert("You succesfully logged out!")
            // Handle response or redirect to another page
            router.push("/login");
        }
        

        const url = "/profile/" + uid + "?self=true";
        // console.log(url);

    return (
        <nav className={styles.navbar}>
            <Link href="/main" className={styles.logo}>YEAH</Link>
            <div className={styles.navlinks}>

                <form onSubmit={handleSubmit} className={styles.search}>
                    <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className={styles.searchInputState}/>
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={styles.searchInputCity}/>
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className={styles.searchInputCategory} />
                    <input type="text" placeholder="Name" value={names} onChange={(e) => setName(e.target.value)} className={styles.searchInputName}  />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </form>
                <Link href= {url} className={styles.logoutlink}>Profile</Link>

                <Link href="/logout" onClick={handleLogout} className={styles.logoutlink}>Logout</Link>


            </div>
        </nav>
    );
};

export default Navbar;
