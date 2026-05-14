function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xl ${
            rating >= star
              ? 'text-yellow-400'
              : 'text-gray-500'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingStars;