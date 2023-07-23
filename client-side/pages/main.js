import React, { useState } from 'react';
import styles from '../styles/main.module.css';
import Navbar from '../components/Navbar';

function GoogleLikePage() {
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

    return (
        <div>
            <Navbar> </Navbar>

            <div className={styles.container}>
                <h1 className={styles.title}>{"YEAH Search"}</h1>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <div className={styles.search}>
                        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className={styles.searchInputState}/>
                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={styles.searchInputCity}/>
                        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className={styles.searchInputCategory} />
                        <input type="text" placeholder="Name" value={names} onChange={(e) => setName(e.target.value)} className={styles.searchInputName}  />
                    </div>
                    <input type="submit" value="Search" className={styles.searchButton} />
                    {/* <button type="submit" className={styles.searchButton}>Search</button> */}
                </form>

            {/* <img src="/google-logo.png" alt="Google Logo" className={styles.logo} /> */}
                
            </div>
        </div>
        
    );
}

export default GoogleLikePage;