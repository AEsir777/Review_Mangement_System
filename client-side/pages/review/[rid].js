import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import styles from '../../styles/review.module.css';

// TODO: cool is broken

export default function review() {
    const router = useRouter();
    const { rid } = router.query;
    const [review, setReview] = useState(null);
    const [text, setText] = useState('');
    const [stars, setStars] = useState(0);
    const [cool, setCool] = useState(0);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/review/${rid}`, { withCredentials: true });
                setReview(response.data.review);
                setText(response.data.review.text);
                setStars(response.data.review.stars);
                setCool(response.data.review.cool);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReview();
    }, [rid]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleStarsChange = (nextValue) => {
        setStars(nextValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/api/review/${rid}`, {
                text: text,
                stars: stars
            },
            { withCredentials: true });

            router.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:3000/api/review/${rid}`, { withCredentials: true });
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCool = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/api/review/${rid}/cool`, { withCredentials: true });
            setCool(cool + 1);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <p> Review ID: {rid} </p>
            {review ? (
                <div>
                    <h2 className={styles.title}>{review.text}</h2>
                    <div className={styles.stars}>
                    <Rating name="read-only" value={review.stars} readOnly /> <br />
                    <button className={styles.coolButton} onClick={handleCool}>Cool: {cool}</button>
                    </div>
                    <div className={styles.edit}>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Text:</label>
                                <input type="text" value={text} onChange={handleTextChange} />
                            </div>
                            <div>
                                <label>Stars:</label>
                                <Rating
                                    name="simple-controlled"
                                    value={stars}
                                    onChange={handleStarsChange}
                                />
                            </div>
                            <button type="submit">Update</button>
                            <button type="button" className={styles.delete} onClick={handleDelete}>Delete</button>
                        </form>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}