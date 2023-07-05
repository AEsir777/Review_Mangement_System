import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Business.module.css';
import Navbar from '../../components/Navbar';

export default function business() {
  const router = useRouter();
  const { bid } = router.query;
  const [business, setBusiness] = useState(null);
  const [allreviews, setAllreviews] = useState(null);

  useEffect(() => {
    const etServerSideProps = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/business/${bid}`,
          { withCredentials: true });
        setBusiness(res.data.business);
        console.log(business);
        setAllreviews(res.data.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    etServerSideProps();
  }, [bid]);

  return (
    
    <div className={styles.container}>
      {business ? (
      <div>
      <Head>
        <title>{business.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar> </Navbar>
      
      <main className={styles.main}>
        <h1 className={styles.title}>{business.name}</h1>
        <p className={styles.description}>{business.cate}</p>
        <p className={styles.info}>{business.city}, {business.state}, {business.address}</p>
        <p className={styles.info}>Postal: {business.postalCode}</p>
        <p className={styles.info}>Open Hours: {business.hours}</p>
        <p className={styles.info}>Stars: {"★".repeat(business.stars)}</p>
        {/* <p className={styles.info}>{business.reviewCount}</p> */}
        
        <div className={styles.reviews}>
          {allreviews.map((review, index) => (
            <div key={index} className={styles.review}>
              {/* <h3>{review.reviewerName}</h3> */}
              {typeof review.text === 'string' && review.text.trim() !== "" && (
                <div>
                    <p>{review.text}</p>
                    <button className={styles.button}> Cool</button>
                </div>
              )}
              
            </div>
          ))}
        </div>
      </main>
      </div>
      ) : (
      <p>Loading...</p>
      )}
    </div>
  );
};

