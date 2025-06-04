'use client'

import React, { useState } from 'react'
import { mbtiTypes, MBTIType } from './utils/mbti'

export default function MBTIWheel() {
  const [selectedType, setSelectedType] = useState<MBTIType['code'] | null>(null)

  const handleTypeClick = (type: MBTIType['code']) => {
    setSelectedType(type)
    // Here you can add logic to navigate to the chat room or show more info
    console.log(`Selected MBTI type: ${type}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-8">MBTI Type Selector</h1>
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
        {mbtiTypes.map((type, index) => {
          const angle = (index / 16) * 2 * Math.PI - Math.PI / 2
          const x = Math.cos(angle)
          const y = Math.sin(angle)
          return (
            <button
              key={type}
              className={`absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center 
                         text-xs md:text-sm lg:text-base font-semibold rounded-full 
                         transition-all duration-300 ease-in-out
                         ${selectedType === type ? 'bg-blue-500 text-white scale-110' : 'bg-white hover:bg-gray-100'}`}
              style={{
                left: `calc(50% + ${x * 40}%)`,
                top: `calc(50% + ${y * 40}%)`,
                transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI)}deg)`,
              }}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </button>
          )
        })}
      </div>
      {selectedType && (
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold">Selected MBTI Type: {selectedType}</p>
          <button 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
            onClick={() => console.log(`Joining chat room for ${selectedType}`)}
          >
            Join Chat Room
          </button>
        </div>
      )}
    </div>
  )
}
