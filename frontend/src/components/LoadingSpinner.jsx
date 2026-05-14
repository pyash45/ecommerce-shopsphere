function LoadingSpinner() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;