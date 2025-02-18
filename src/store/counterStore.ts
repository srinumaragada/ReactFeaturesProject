import { create } from 'zustand';

interface CounterState {
  count: number;
  backgroundColor: string;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => {
  
  const storedCount = localStorage.getItem('count');
  const storedBackgroundColor = localStorage.getItem('backgroundColor');

  return {
    count: storedCount ? parseInt(storedCount) : 0,
    backgroundColor: storedBackgroundColor || 'rgb(255, 255, 255)',

    increment: () => set((state) => {
      const newCount = state.count + 1;
      const intensity = Math.min(newCount * 20, 255);
      const newColor = `rgb(${intensity}, ${Math.max(255 - intensity, 0)}, ${Math.max(255 - intensity, 0)})`;

      // Save updated count and color to localStorage
      localStorage.setItem('count', newCount.toString());
      localStorage.setItem('backgroundColor', newColor);

      return {
        count: newCount,
        backgroundColor: newColor,
      };
    }),

    decrement: () => set((state) => {
      const newCount = state.count - 1;
      const intensity = Math.max(newCount * 20, 0);
      const newColor = `rgb(${intensity}, ${Math.max(255 - intensity, 0)}, ${Math.max(255 - intensity, 0)})`;

     
      localStorage.setItem('count', newCount.toString());
      localStorage.setItem('backgroundColor', newColor);

      return {
        count: newCount,
        backgroundColor: newColor,
      };
    }),

    reset: () => set((state) => {
      // Reset the count and backgroundColor to their initial values
      const resetCount = 0;
      const resetColor = 'rgb(255, 255, 255)';

      // Save updated count and color to localStorage
      localStorage.setItem('count', resetCount.toString());
      localStorage.setItem('backgroundColor', resetColor);

      return {
        count: resetCount,
        backgroundColor: resetColor,
      };
    })
  };
});
