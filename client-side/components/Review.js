import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import styles from '../styles/Review.module.css';
import CoolButton from './CoolButton';


export default function Review(props) {
    axios.defaults.withCredentials = true;
    const router = useRouter();
    const [review, setReview] = useState(null);
    const [isCooled, setIsCooled] = useState(false);
    const [text, setText] = useState(null);
    const [stars, setStars] = useState(null);
    const [date, setDate] = useState(null);
    const [writtenByMe, setWrittenByMe] = useState(false);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/review/${props.rid}`);
                setIsCooled(response.data.isCooled);
                setReview(response.data.review);
                const date = new Date(response.data.review.date);
                setDate(date.toLocaleString());
                setText(response.data.review.text);
                setStars(response.data.review.stars);
                setWrittenByMe(response.data.writtenByMe);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReview();
    }, []);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleStarsChange = (e) => {
        setStars(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/api/review/${props.rid}`, {
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
            const response = await axios.delete(`http://localhost:3000/api/review/${props.rid}`);
            router.push(`/business/${review.bid}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCool = async (e) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/review/${props.rid}/cool`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckDetails = async (e) => {
        try {
            router.push(`/review/${review.rid}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            {review ? (
                <div>
                    { (! props.canEdit) ? (
                        <button className={styles.buttonCheckDetails} onClick={handleCheckDetails}>
                            Check Details
                        </button>
                    ) : (
                        <p></p>
                    )}
                    <p> Written at {date} by <span className={styles.underline}>{review.name}</span> </p>
                    
                    <h2 className={styles.title}>{review.text}</h2>
                    <div className={styles.stars}>
                    <Rating name="read-only" value={review.stars} readOnly />
                    </div>
                    <CoolButton onClick={handleCool} isCooled={isCooled} coolCount={review.cool}></CoolButton>
                    {writtenByMe & props.canEdit ? (
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