import { useEffect, useState } from 'react';

const slides = [
  {
    title: 'Mega Electronics Sale',
    subtitle:
      'Up to 70% off on premium gadgets',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'
  },
  {
    title: 'Fashion Week Specials',
    subtitle:
      'Premium collections at unbeatable prices',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050'
  },
  {
    title: 'Gaming Zone',
    subtitle:
      'Level up your setup with latest gear',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e'
  }
];

function HeroSlider() {
  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setCurrent(
          (prev) =>
            (prev + 1) %
            slides.length
        );
      }, 4000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
      <img
        src={
          slides[current].image
        }
        alt="banner"
        className="w-full h-full object-cover transition-all duration-700"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col justify-center px-12">
        <h1 className="text-5xl md:text-6xl font-black text-white max-w-2xl">
          {
            slides[current]
              .title
          }
        </h1>

        <p className="text-xl text-gray-200 mt-5 max-w-xl">
          {
            slides[current]
              .subtitle
          }
        </p>

        <button className="mt-8 px-8 py-4 bg-cyan-500 rounded-2xl text-white font-bold w-fit hover:bg-cyan-400 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default HeroSlider;