import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Business.module.css';
import Navbar from '../../components/Navbar';
import ProfileReview from '../../components/ProfileReview';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [self, setSelf] = useState(null);
  const  uuid  = router.query.uid;
  useEffect(() => {

    const fetchUserData = async () => {
      if (router.isReady) {
        const  uid  = router.query.uid;
        const  selfBool  = router.query.self;
        try {
          const response = await axios.get(`http://localhost:3000/api/userprofile/${uid}`,{ withCredentials: true });
          setUser(response.data.profile);
          setSelf(selfBool);
          setReviews(response.data.review);
          console.log(user);
        } catch (error) {
          console.error('Failed to fetch user and reviews:', error);
        }
      }

    };

    fetchUserData();
  }, [router.isReady, uuid]);


  console.log(user);
  console.log(self);


  if (!user) {
    return 'Loading...';
  }

  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.container2}>
          <Head>
            <title>{user.name}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Navbar> </Navbar>

          <main className={styles.main}>


            <div>
              <h1 className={styles.title}>{user.name}</h1>
              {user.createTime ? <p className={styles.description}>createTime: {new Date(user.createTime).toLocaleDateString()}</p> : null}
              {user.cools ? <p className={styles.info}>cool: {user.cools}</p> : null}
              {user.reviewCount ? <p className={styles.info}>review count: {user.reviewCount}</p> : null}
              {/* <p className={styles.info}>{business.reviewCount}</p> */}
            </div>
            {self == "false" ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <input type="submit" value="Add Friend" className={styles.searchButtonProfile} />
            </div> : null}
            
            

            <div className={styles.reviews}>
              {reviews && reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <ProfileReview rid={review.rid} canEdit={false}>  </ProfileReview>
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
}
