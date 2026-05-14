import RatingStars from './RatingStars';

function ReviewCard({ review }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-white text-xl font-bold">
          {review.name}
        </h3>

        <RatingStars rating={review.rating} />
      </div>

      <p className="text-gray-300 mt-4">
        {review.comment}
      </p>
    </div>
  );
}

export default ReviewCard;