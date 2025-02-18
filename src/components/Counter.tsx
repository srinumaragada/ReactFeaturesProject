import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useCounterStore } from '../store/counterStore';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export const Counter: React.FC = () => {
  const { count, backgroundColor, increment, decrement, reset } = useCounterStore();

  const props = useSpring({
    backgroundColor,
    config: { tension: 120, friction: 14 }
  });

  return (
    <animated.div style={props} className="p-8 rounded-lg shadow-lg w-full max-w-full">
      <div className="text-center">
        <p className="font-bold text-lg mb-10">Interactive Counter</p>
        <h2 className="text-3xl font-bold mb-6">Counter: {count}</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={increment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} /> Increment
          </button>
          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Minus size={20} /> Decrement
          </button>
          <button
            onClick={reset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw size={20} /> Reset
          </button>
        </div>
      </div>
    </animated.div>
  );
};
