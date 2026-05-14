function EmptyState({ title, subtitle }) {
  return (
    <div className="text-center py-20">
      <div className="text-8xl mb-6">🛒</div>

      <h2 className="text-3xl font-bold text-white">
        {title}
      </h2>

      <p className="text-gray-300 mt-4">
        {subtitle}
      </p>
    </div>
  );
}

export default EmptyState;