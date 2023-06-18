import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function review() {
    const router = useRouter();
    const { rid } = router.query;
    const [review, setReview] = useState(null);
    const [text, setText] = useState('');
    const [stars, setStars] = useState(0);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/review/${rid}`, { withCredentials: true });
                setReview(response.data.review);
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
            router.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <p> Review ID: {rid} </p>
            {review ? (
                <div>
                    <p>{review.text}</p>
                    <p>{review.stars}</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Text:</label>
                            <input type="text" value={text} onChange={handleTextChange} />
                        </div>
                        <div>
                            <label>Stars:</label>
                            <input type="number" value={stars} onChange={handleStarsChange} min="0" max="5" />
                        </div>
                        <button type="submit">Update</button>
                    </form>
                    <button type="submit" onClick={handleDelete}>delete</button>
                    <button type="submit" onClick={handleCool}>Cool: {review.cool} +</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}