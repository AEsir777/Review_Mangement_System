import Head from 'next/head';
import axios from 'axios';
import styles from '../../styles/Business.module.css';
import Navbar from '../../components/Navbar';

const BusinessPage = ({ business, allreviews }) => {
  return (
    <div className={styles.container}>
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
  );
};

export async function getServerSideProps(context) {
  const { bid } = context.params;
  const res = await axios.get(`http://localhost:3000/api/business/${bid}`);
  const business = res.data.business;
  const allreviews = res.data.reviews;

  return {
    props: { business, allreviews},
  };
}


export default BusinessPage;
