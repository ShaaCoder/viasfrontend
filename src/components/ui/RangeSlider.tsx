import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { cn } from '../../utils/cn';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

export function RangeSlider({
  min,
  max,
  step = 1000,
  value,
  onValueChange,
  formatValue = (v) => `₹${v.toLocaleString()}`,
}: RangeSliderProps) {
  return (
    <div className="space-y-4">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        onValueChange={onValueChange}
        max={max}
        min={min}
        step={step}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className={cn(
            "block w-5 h-5 bg-white rounded-full border-2 border-blue-500",
            "focus:outline-none focus-visible:ring focus-visible:ring-blue-500",
            "hover:bg-blue-50 transition-colors cursor-grab active:cursor-grabbing",
            "shadow-sm"
          )}
          aria-label="Min price"
        />
        <Slider.Thumb
          className={cn(
            "block w-5 h-5 bg-white rounded-full border-2 border-blue-500",
            "focus:outline-none focus-visible:ring focus-visible:ring-blue-500",
            "hover:bg-blue-50 transition-colors cursor-grab active:cursor-grabbing",
            "shadow-sm"
          )}
          aria-label="Max price"
        />
      </Slider.Root>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Min:</span>
          <span className="ml-1 font-medium text-gray-900">{formatValue(value[0])}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Max:</span>
          <span className="ml-1 font-medium text-gray-900">{formatValue(value[1])}</span>
        </div>
      </div>
    </div>
  );
}