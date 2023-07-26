import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Search.module.css';
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import CircularIndeterminate from './Spinner';

export default function BusinessTab(props) {
    axios.defaults.withCredentials = true;
    const [business, setBusiness] = useState(null);
    const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/business/${props.bid}`);
          setBusiness(res.data.business);
          setPhoto(res.data.photo);
        } catch (error) {
          console.error(error);
        }
    };

    fetchBusiness();
  }, []);

  return (
    <div className={styles.review}> 
        { business ? (
            <div>
              {typeof business.bid === 'string' && business.bid.trim() !== "" && (
                <Link href={`http://localhost:8000/business/${business.bid}`} className={styles.linkClass}>
                  <div className={styles.resultBox}>
                    <div className={styles.leftGrid}>
                      <h2>{business.name}</h2>
                      <Rating className={styles.stars} value={business.stars} readOnly precision={0.1} />
                      <p>{business.cate} {" "}</p>
                      <p>Open Hours: 8:00 - 17:00 </p>
                    </div>

                    <div className={styles.rightGrid}>
                    { photo.pid ? (
                        <img className={styles.picture}
                        src={"/photos/" + photo.pid + ".jpg"}
                        alt={photo.caption} />
                      ) : (<p></p>)}
                    </div>                    
                  </div>
                </Link>
              )}
            </div>
         )
        : (
            <div>
            <CircularIndeterminate />
            <p>Loading...</p>
            </div>
        )}
    </div> 
  );
};
