import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import axios from 'axios';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // handle your search here
        try {
            const results = searchData(searchTerm);
            console.log(results); // Do something with the results
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    

    const searchData = async (searchTerm) => {
        const response = await axios.post('http://localhost:3000/api/business/search', {
            name: searchTerm
        }, { withCredentials: true });
        return response.data;
    }
    

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>YEAH</Link>
            <div className={styles.navlinks}>
                <Link href="/business" className={styles.link}>Business</Link>
                <Link href="/events" className={styles.link}>Profile</Link>
                <form onSubmit={handleSearchSubmit} className={styles.search}>
                    <input 
                        type="text" 
                        placeholder="Search By Name" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        className={styles.searchInput} 
                    />
                    <button type="submit" className={styles.searchButton}>Go</button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
