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
    const [newText, setNewText] = useState("");
    const [newStars, setNewStars] = useState(3);
    const [photo, setPhoto] = useState(null);


    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                if (router.isReady) {
                    const res = await axios.get(`http://localhost:3000/api/business/${bid}`);
                    setBusiness(res.data.business);
                    setAllreviews(res.data.reviews);
                    setPhoto(res.data.photo);
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
                        <div className={styles.gridContainer}>
                            <div className={styles.leftGrid}>
                                <h1 className={styles.title}>{business.name}</h1>
                                <p className={styles.description}>{business.cate}</p>
                                <p className={styles.info}>{business.city}, {business.state}, {business.address}</p>
                                <p className={styles.info}>Postal: {business.postalCode}</p>
                                <p className={styles.info}>Open Hours: {business.hours}</p>
                                <div className={styles.rating}>
                                    <Rating value={business.stars} readOnly precision={0.1} />
                                </div>
                                {/* <p className={styles.info}>{business.reviewCount}</p> */}
                            </div>

                            <div className={styles.rightGrid}>
                                {/*https://github.com/AEsir777/Review_Mangement_System/blob/business/Photoes/-Zw9JqGQRYzkPrV_QUzMvw.jpg*/}
                                <img className={styles.picture} 
                                    src={"/photoes/" + photo.pid + ".jpg"} 
                                    alt={photo.caption} />
                            </div>
                        </div>

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

