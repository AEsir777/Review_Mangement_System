import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import axios from 'axios';

const Navbar = () => {
        const [names, setName] = useState("");
        const [category, setCategory] = useState("");
        const [state, setState] = useState("");
        const [city, setCity] = useState("");
      
        const handleSubmit = (e) => {
            e.preventDefault();
            let encodedName = encodeURIComponent(names ? names.trim() : "");
            let encodedCategory = encodeURIComponent(category ? category.trim() : "");
            let encodedState = encodeURIComponent(state ? state.trim() : "");
            let encodedCity = encodeURIComponent(city ? city.trim() : "");
        
            console.log(encodedName);
            console.log(encodedCategory);
            console.log(encodedState);
            console.log(encodedCity);

            let url_base = `http://localhost:3000/api/business/search?`;
            let nameparam = encodedName ? `name=${encodedName}` : "";
            let categoryparam = encodedCategory ? `&category=${encodedCategory}` : "";
            let stateparam = encodedState ? `&state=${encodedState}` : "";
            let cityparam = encodedCity ? `&city=${encodedCity}` : "";
            let url = url_base + nameparam + categoryparam + stateparam + cityparam;

            window.location.href = url;
        };


    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>YEAH</Link>
            <div className={styles.navlinks}>
                <Link href="/business" className={styles.buslink}>Business</Link>
                <Link href="/profile" className={styles.profilelink}>Profile</Link>
                {/* <form onSubmit={handleSearchSubmit} className={styles.search}>
                    <input 
                        type="text" 
                        placeholder="Search By Name" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        className={styles.searchInput} 
                    />
                    <button type="submit" className={styles.searchButton}>Go</button>
                </form> */}


                <form onSubmit={handleSubmit} className={styles.search}>
                    <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className={styles.searchInputState}/>
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={styles.searchInputCity}/>
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className={styles.searchInputCategory} />
                    <input type="text" placeholder="Name" value={names} onChange={(e) => setName(e.target.value)} className={styles.searchInputName}  />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </form>



                
            </div>
        </nav>
    );
};

export default Navbar;
