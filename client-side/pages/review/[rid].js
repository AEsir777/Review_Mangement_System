import { useRouter } from 'next/router';
import Review from '../../components/Review';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Review.module.css';

export default function ViewReviewDetail() {
    const router = useRouter();
    const { rid } = router.query;

    return (
        <div>
            <Navbar> </Navbar>
            <div className={styles.centerReview}>
                {router.isReady ? (
                    <Review rid={rid} canEdit={true} showBus={true}> </Review>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}