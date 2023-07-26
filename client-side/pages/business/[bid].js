import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Business.module.css';
import Navbar from '../../components/Navbar';
import Review from '../../components/Review';
import Rating from '@mui/material/Rating';
import StarDistribution from '../../components/StarDistribution';

export default function Business() {
  axios.defaults.withCredentials = true;
  const [showOwnReviews, setShowOwnReviews] = useState(false); // State for checkbox
  const router = useRouter();
  const { bid } = router.query;
  const [business, setBusiness] = useState(null);
  const [allreviews, setAllreviews] = useState(null);
  const [labels, setLabels] = useState(["terrible", "bad", "so so", "good", "excellent"]);
  const [newText, setNewText] = useState("");
  const [newStars, setNewStars] = useState(3);
  const [photo, setPhoto] = useState(null);
  const [uid, setUid] = useState(null);


  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        if (router.isReady) {
          const res = await axios.get(`http://localhost:3000/api/business/${bid}`);
          setBusiness(res.data.business);
          setAllreviews(res.data.reviews);
          setPhoto(res.data.photo);
          setUid(res.data.uid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusiness();
  }, [bid]);

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleStarsChange = (e) => {
    setNewStars(e.target.value);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/business/${bid}`, {
        text: newText,
        stars: newStars
      });

      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className={styles.container}>
      {business ? (
        <div className={styles.container2}>
          <Head>
            <title>{business.name}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Navbar> </Navbar>

          <main className={styles.main}>

            {photo ? (
              <div className={styles.gridContainer}>
                <div className={styles.leftGrid}>
                  <h1 className={styles.title}>{business.name}</h1>
                  <p className={styles.description}>{business.cate}</p>
                  <p className={styles.info}>{business.city}, {business.state}, {business.address}</p>
                  <p className={styles.info}>Postal: {business.postalCode}</p>
                  <p className={styles.info}>Open Hours: 8:00 - 17:00 </p>
                  {/* <p className={styles.info}>Open Hours: {business.hours.substring(8, 13)} - {business.hours.substring(13,18)}</p> */}
                </div>

                <div className={styles.rightGrid}>
                  <img className={styles.picture}
                    src={"/photos/" + photo.pid + ".jpg"}
                    alt={photo.caption} />
                </div>
              </div>
            ) : (
              <div>
                <h1 className={styles.title}>{business.name}</h1>
                <p className={styles.description}>{business.cate}</p>
                <p className={styles.info}>{business.city}, {business.state}, {business.address}</p>
                <p className={styles.info}>Postal: {business.postalCode}</p>
                <p className={styles.info}>Open Hours: {business.hours}</p>
                {/* <p className={styles.info}>{business.reviewCount}</p> */}
              </div>
            )}
            <div className={styles.gridContainer}>
              <div className={`{styles.leftGrid} {styles.dist}`}>
              <StarDistribution bid={bid} avg={business.stars}></StarDistribution>
              </div>
              <div className={styles.rightGrid}>
                <div className={styles.addReview}>
                  <h2 className={styles.addReviewTitle}>Add a Review</h2>
                  <textarea
                    className={styles.reviewTextarea}
                    value={newText}
                    placeholder="Enter your review..."
                    onChange={handleTextChange}
                  />
                  <Rating
                    className={styles.reviewRating}
                    name="review-rating"
                    defaultValue={3}
                    number={newStars}
                    onChange={handleStarsChange}
                    precision={1}
                  />
                  <button
                    className={styles.reviewButton}
                    onClick={handleAddReview}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            <div className={styles.centeredInput} >
              <input
                type="checkbox" 
                checked={showOwnReviews}
                onChange={(e) => setShowOwnReviews(e.target.checked)}
              />
              <label>Show Only My Reviews</label>
            </div>
            

            <div className={styles.reviews}>
              {allreviews && allreviews.map((review, index) => {
                // Add filtering based on showOwnReviews state
                if ( !showOwnReviews || review.uid === uid) {
                  return (
                    <div key={index} className={styles.review}>
                      <Review rid={review.rid} canEdit={false} showBus={false} />
                    </div>
                  );
                } else {
                  return null; // Return null for reviews that don't match the filter
                }
              })}
            </div>
          </main>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

