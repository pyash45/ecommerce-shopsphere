function SkeletonCard() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 animate-pulse">
      <div className="h-8 bg-white/20 rounded w-1/3 mb-6"></div>
      <div className="h-5 bg-white/20 rounded w-2/3 mb-4"></div>
      <div className="h-5 bg-white/20 rounded w-1/2"></div>
    </div>
  );
}

export default SkeletonCard;