import { useParams } from 'react-router';
import CommunityPosts from './CommunityPosts';

const CommunityDetails = () => {
    const { communityId } = useParams<{ communityId: string }>();
    return (
        <div>
            <CommunityPosts id={Number(communityId)} />
        </div>
    );
};

export default CommunityDetails;
