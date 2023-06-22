import Head from 'next/head';
import axios from 'axios';
import styles from '../../styles/Business.module.css';
import Navbar from '../../components/Navbar';

const BusinessPage = ({ business }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{business.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar> </Navbar>
      <main className={styles.main}>
        <h1 className={styles.title}>{business.name}</h1>
        <p className={styles.description}>{business.description}</p>
        <p className={styles.info}>{business.address}</p>
        <p className={styles.info}>{business.phone}</p>
        
        <div className={styles.reviews}>
          {business.reviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <h3>{review.reviewerName}</h3>
              <p>{"★".repeat(review.rating)}</p>
              <p>{review.text}</p>
              <button className={styles.button}> Cool</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { bid } = context.params;
  const res = await axios.get(`http://localhost:3000/business/`);
  const business = res.data[0];

  return {
    props: { business },
  };
}

export default BusinessPage;
