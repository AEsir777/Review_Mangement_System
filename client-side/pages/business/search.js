import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Search.module.css';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function business() {
  const router = useRouter();
  const  category  = router.query.category;
  const  names  = router.query.name;
  const  state  = router.query.state;
  const  city  = router.query.city;
  const [business, setBusiness] = useState(null);


  let encodedName = encodeURIComponent(names ? names.trim() : "");
  let encodedCategory = encodeURIComponent(category ? category.trim() : "");
  let encodedState = encodeURIComponent(state ? state.trim() : "");
  let encodedCity = encodeURIComponent(city ? city.trim() : "");

  let url_base = `http://localhost:3000/api/business/search?`;
  let nameparam = encodedName ? `name=${encodedName}` : "";
  let categoryparam = encodedCategory ? `&category=${encodedCategory}` : "";
  let stateparam = encodedState ? `&state=${encodedState}` : "";
  let cityparam = encodedCity ? `&city=${encodedCity}` : "";
  let url = url_base + nameparam + categoryparam + stateparam + cityparam;

  useEffect(() => {
    const etServerSideProps = async () => {
      try {
        const res = await axios.get(url,
          { withCredentials: true });
        setBusiness(res.data);
        console.log(business);
      } catch (error) {
        console.error(error);
      }
    };

    etServerSideProps();
  }, [category,names,state,city]);

  return (
    
    <div className={styles.container}>
      {business ? (
      <div className={styles.container2}>
      <Head>
        <title>{"Search Result"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar> </Navbar>
      
      <main className={styles.main}>
        <h1 className={styles.title}>{"Search Result"}</h1>
        
        {/* <p className={styles.info}>{business.reviewCount}</p> */}
        
        <div className={styles.reviews}>
          {business.map((single_business, index) => (
            <div key={index} className={styles.review}>
              {/* <h3>{review.reviewerName}</h3> */}
              {typeof single_business.bid === 'string' && single_business.bid.trim() !== "" && (
                <div>
                    <p className={styles.info}>
                        <Link href={`http://localhost:8000/business/${single_business.bid}`} className={styles.linkClass}>
                                {single_business.name} {" "}
                                {single_business.cate} {" "}
                                Open Hours: {single_business.hours} {" "}
                                Stars: {"★".repeat(single_business.stars)}
                        </Link>
                    </p>
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

