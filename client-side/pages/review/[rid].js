import { useRouter } from 'next/router';
import Review from '../../components/Review';

export default function ViewReviewDetail() {
    const router = useRouter();
    const { rid } = router.query;

    return (
        <div>
            {router.isReady ? (
                <Review rid={rid} canEdit={true}> </Review>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}