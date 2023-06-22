import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // handle your search here
    };

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>YEAH</Link>
            <div className={styles.navlinks}>
                <Link href="/business" className={styles.link}>Business</Link>
                <Link href="/events" className={styles.link}>Events</Link>
                <form onSubmit={handleSearchSubmit} className={styles.search}>
                    <input 
                        type="text" 
                        placeholder="Search" 
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
