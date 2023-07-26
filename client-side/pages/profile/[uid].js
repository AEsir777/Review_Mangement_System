import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/profile.module.css';
import Navbar from '../../components/Navbar';
import ProfileReview from '../../components/ProfileReview';
import Link from 'next/link';
import { Button } from '@mui/material';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [self, setSelf] = useState(null);
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [currentuser, setCurrentuser] = useState(null);
  const  uuid  = router.query.uid;
  useEffect(() => {

    const fetchUserData = async () => {
      if (router.isReady) {
        const  uid  = router.query.uid;
        const  selfBool  = router.query.self;
        try {
          const response = await axios.get(`http://localhost:3000/api/userprofile/${uid}`,{ withCredentials: true });
          const response2 = await axios.get(`http://localhost:3000/api/friends/followers/${uid}`,{ withCredentials: true });
          const response3 = await axios.get(`http://localhost:3000/api/friends/followings/${uid}`,{ withCredentials: true });
          const response4 = await axios.get(`http://localhost:3000/api/userprofile/getuseruid`,{ withCredentials: true });
          setUser(response.data.profile);
          setSelf(selfBool);
          setReviews(response.data.review);
          setFollowers(response2.data)
          setFollowings(response3.data)
          setCurrentuser(response4.data)
          console.log(user);
          console.log(followers);
          console.log(followings);
        } catch (error) {
          console.error('Failed to fetch user and reviews:', error);
        }
      }

    };

    fetchUserData();
  }, [router.isReady, uuid]);


  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    try {
      const response = await axios.post(`http://localhost:3000/api/friends/follow/${router.query.uid}`);
      router.reload();
      // Handle your response here
      console.log(response.data);
    } catch (error) {
      // Handle your error here
      console.log('Failed to send POST request:', error);
    }
  };


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
              <a className={styles.greenButton} target='_blank' href={`recommendation/${uuid}`}>
                Don't know where to go? 
              </a> 
              <h1 className={styles.title}>{user.name}</h1>
              {user.createTime ? <p className={styles.description}>createTime: {new Date(user.createTime).toLocaleDateString()}</p> : null}
              {user.cools ? <p className={styles.info}>cool: {user.cools}</p> : null}
              {user.reviewCount ? <p className={styles.info}>review count: {user.reviewCount}</p> : null}
              {/* <p className={styles.info}>{business.reviewCount}</p> */}
            </div>
            {self == "false" ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <form onSubmit={handleSubmit}>
                <input type="submit" value="Follow" className={styles.searchButtonProfile} />
              </form>
            </div> : null}
            
            <div className={styles.grid}>
                <div className={styles.left_panel}>
                  <h2 className="panel-title" style={{ textAlign: 'center', margin: '10px'}}>Followers</h2>
                  {followers ? followers.map((follower, index) => (
                  <div key={index} className={styles.info}>
                    <Link href= {"/profile/" + follower.uid1 + "?self=" + (follower.uid1 == currentuser.uid ? "true" : "false")} className={styles.info}>
                      {follower.name}
                    </Link>
                  </div>
                  )) : 
                  <div className={styles.info}>
                  <p className={styles.info}>None</p>
                  </div>}
                </div>
                <div className={styles.right_panel}>
                <h2 className="panel-title" style={{ textAlign: 'center', margin: '10px'}}>Following</h2>
                {followings ? followings.map((following, index) => (
                  <div key={index} className={styles.info}>
                    <Link href= {"/profile/" + following.uid2 + "?self=" + (following.uid2 == currentuser.uid ? "true" : "false")} className={styles.info}>
                      {following.name}
                    </Link>
                  </div>
                  )) : 
                  <div className={styles.info}>
                  <p className={styles.info}>None</p>
                  </div>}
                </div>
            </div>

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
