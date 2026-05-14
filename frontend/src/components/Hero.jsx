import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 h-[400px] flex items-center justify-center text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1920"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        alt="Hero Food"
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Craving something delicious?</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">Order from your favorite restaurants and get it delivered fast!</p>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter your delivery location"
            className="flex-1 px-6 py-3 rounded-md text-gray-900 focus:outline-none"
          />
          <button className="bg-primary hover:bg-orange-600 px-8 py-3 rounded-md font-bold transition">
            Find Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
