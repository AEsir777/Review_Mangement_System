import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Business.module.css';
import Navbar from '../../components/Navbar';
import Review from '../../components/Review';
import Rating from '@mui/material/Rating';

export default function Business() {
    axios.defaults.withCredentials = true;
    const router = useRouter();
    const { bid } = router.query;
    const [business, setBusiness] = useState(null);
    const [allreviews, setAllreviews] = useState(null);
    const [labels, setLabels] = useState(["terrible", "bad", "so so", "good", "excellent"]);
    const [newText, setNewText] = useState(null);
    

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                if (router.isReady) {
                    const res = await axios.get(`http://localhost:3000/api/business/${bid}`);
                    setBusiness(res.data.business);
                    console.log(res.data.business.stars);
                    setAllreviews(res.data.reviews);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchBusiness();
    }, [bid]);

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
                        <h1 className={styles.title}>{business.name}</h1>
                        <p className={styles.description}>{business.cate}</p>
                        <p className={styles.info}>{business.city}, {business.state}, {business.address}</p>
                        <p className={styles.info}>Postal: {business.postalCode}</p>
                        <p className={styles.info}>Open Hours: {business.hours}</p>
                        <div className={styles.rating}>
                            <Rating value={business.stars} readOnly precision={0.1} />
                        </div>
                        {/* <p className={styles.info}>{business.reviewCount}</p> */}

                        <div className={styles.addReview}>
                            <h2 className={styles.addReviewTitle}>Add a Review</h2>
                            <textarea
                                className={styles.reviewTextarea}
                                placeholder="Enter your review..."
                            />
                            <Rating
                                className={styles.reviewRating}
                                name="review-rating"
                                defaultValue={3}
                                precision={1}
                            /> 
                            <button
                                className={styles.reviewButton}
                                onClick={() => handleAddReview()}
                            >
                                Add
                            </button>
                        </div>

                        <div className={styles.reviews}>
                            {allreviews && allreviews.map((review, index) => (
                                <div key={index} className={styles.review}>
                                    <Review rid={review.rid} canEdit={false}> </Review>
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

