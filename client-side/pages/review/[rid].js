import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import styles from '../../styles/Review.module.css';
import CoolButton from '../../components/CoolButton';

// TODO: cool is broken

export default function review() {
    axios.defaults.withCredentials = true;
    const router = useRouter();
    const { rid } = router.query;
    const [review, setReview] = useState(null);
    const [isCooled, setIsCooled] = useState(false);
    const [text, setText] = useState(null);
    const [stars, setStars] = useState(null);
    const [date, setDate] = useState(null);
    const [writtenByMe, setWrittenByMe] = useState(false);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                if (router.isReady) {
                    const response = await axios.get(`http://localhost:3000/api/review/${rid}`);
                    setIsCooled(response.data.isCooled);
                    setReview(response.data.review);
                    const date = new Date(response.data.review.date);
                    setDate(date.toLocaleString());
                    setText(response.data.review.text);
                    setStars(response.data.review.stars);
                    // TO DO test this
                    setWrittenByMe(true);
                }  
            } catch (error) {
                console.error(error);
            }
        };

        fetchReview();
    }, [rid]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleStarsChange = (e) => {
        setStars(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/api/review/${rid}`, {
                text: text,
                stars: stars
            });

            router.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:3000/api/review/${rid}`);
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCool = async (e) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/review/${rid}/cool`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            {review ? (
                <div>
                    <p> Written at {date} by <span className={styles.underline}>{review.name}</span> </p>
                    <h2 className={styles.title}>{review.text}</h2>
                    <div className={styles.stars}>
                    <Rating name="read-only" value={review.stars} readOnly />
                    </div>
                    <CoolButton onClick={handleCool} isCooled={isCooled} coolCount={review.cool}></CoolButton>
                    {writtenByMe ? (
                        <div className={styles.edit}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.field}>
                                    <label>Text:</label>
                                    <input type="text" value={text} onChange={handleTextChange} />
                                </div>
                                <div className={styles.field}>
                                    <label>Stars:</label> <br></br>
                                    <Rating
                                        name="simple-controlled"
                                        number={stars}
                                        onChange={handleStarsChange}
                                    />
                                </div>
                                <button type="submit">Update</button>
                                <button type="button" className={styles.delete} onClick={handleDelete}>Delete</button>
                            </form>
                        </div>
                    ) : (
                        <div></div>
                    )}

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}