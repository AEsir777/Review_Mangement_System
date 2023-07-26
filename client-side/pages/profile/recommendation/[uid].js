import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../styles/Search.module.css';
import Navbar from '../../../components/Navbar';
import CircularIndeterminate from '../../../components/Spinner';
import BusinessTab from '../../../components/BusinessTab';

export default function business() {
  const router = useRouter();
  const [bids, setBids] = useState([]);
  const  uid  = router.query.uid;

  useEffect(() => {
    const fetchBusiness = async () => {
      if (router.isReady) {
        try {
          const res = await axios.get(`http://127.0.0.1:5000/recommend?uid=${uid}`);
          console.log(res);
          setBids(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchBusiness();
  }, [router.isReady, uid]);

  return (
    
    <div className={styles.container}>
      { bids ? (
      <div className={styles.container2}>
      <Head>
        <title>{"Recommendation"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar> </Navbar>
      
      <main className={styles.main}>
        <h1 className={styles.title}>{"Recommendation"}</h1>


        
        <div className={styles.reviews}>
        
          {bids.map((bid, index) => (
            <BusinessTab key={index} bid={bid}> </BusinessTab>
          ))}
        </div>
      </main>
      </div>
      ) : (
      <div>
      <CircularIndeterminate />
      <p>There is no review recommendation for you! You can explore yourself.</p>
      </div>
      )}
    </div>
  );
};