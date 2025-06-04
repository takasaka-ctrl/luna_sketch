'use client'

import React, { useState } from 'react'
import { mbtiCategories, MBTICategory, MBTIType } from './utils/mbti'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DifyLikeUI } from './dify-like-ui'

export default function MBTICircleSelector() {
  const [selectedCategory, setSelectedCategory] = useState<MBTICategory | null>(null)
  const [selectedType, setSelectedType] = useState<MBTIType | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredType, setHoveredType] = useState<string | null>(null)
  const [showOuterCircle, setShowOuterCircle] = useState(true)

  const handleCategorySelect = (category: MBTICategory) => {
    setSelectedCategory(category)
    setSelectedType(null)
    setShowOuterCircle(false)
  }

  const handleTypeSelect = (type: MBTIType) => {
    setSelectedType(type)
  }

  const resetSelection = () => {
    setSelectedCategory(null)
    setSelectedType(null)
    setShowOuterCircle(true)
  }

  const renderOuterCircle = () => (
    <svg viewBox="-20 -20 240 240" className="w-full h-full">
      {mbtiCategories.map((category, index) => {
        const angle = (index * 90 + 45) * (Math.PI / 180)
        const x = 100 + 75 * Math.cos(angle)
        const y = 100 + 75 * Math.sin(angle)
        return (
          <g 
            key={category.name} 
            onClick={() => handleCategorySelect(category)} 
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="cursor-pointer transition-all duration-300 ease-in-out"
            transform={hoveredCategory === category.name ? `scale(1.05)` : ''}
            style={{ transformOrigin: '100px 100px' }}
          >
            <path
              d={`M 100 100 L ${100 + 100 * Math.cos((index * 90) * (Math.PI / 180))} ${100 + 100 * Math.sin((index * 90) * (Math.PI / 180))} A 100 100 0 0 1 ${100 + 100 * Math.cos(((index + 1) * 90) * (Math.PI / 180))} ${100 + 100 * Math.sin(((index + 1) * 90) * (Math.PI / 180))} Z`}
              fill={category.color}
              fillOpacity={hoveredCategory === category.name ? "1" : "0.7"}
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={category.textColor}
              fontSize="12"
              fontWeight="bold"
              style={{ fontFamily: category.font }}
            >
              {category.name.split('（')[0]}
            </text>
          </g>
        )
      })}
    </svg>
  )

  const renderInnerCircle = () => {
    if (!selectedCategory) return null;
    return (
      <svg viewBox="-20 -20 240 240" className="w-full h-full">
        {selectedCategory.types.map((type, index) => {
          const angle = (index * 90 + 45) * (Math.PI / 180)
          const x = 100 + 50 * Math.cos(angle)
          const y = 100 + 50 * Math.sin(angle)
          return (
            <g 
              key={type.code} 
              onClick={() => handleTypeSelect(type)} 
              onMouseEnter={() => setHoveredType(type.code)}
              onMouseLeave={() => setHoveredType(null)}
              className="cursor-pointer transition-all duration-300 ease-in-out"
              transform={hoveredType === type.code ? `scale(1.05)` : ''}
              style={{ transformOrigin: '100px 100px' }}
            >
              <path
                d={`M 100 100 L ${100 + 70 * Math.cos((index * 90) * (Math.PI / 180))} ${100 + 70 * Math.sin((index * 90) * (Math.PI / 180))} A 70 70 0 0 1 ${100 + 70 * Math.cos(((index + 1) * 90) * (Math.PI / 180))} ${100 + 70 * Math.sin(((index + 1) * 90) * (Math.PI / 180))} Z`}
                fill={selectedCategory.color}
                fillOpacity={hoveredType === type.code ? "1" : "0.7"}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={selectedCategory.textColor}
                fontSize="14"
                fontWeight="bold"
                style={{ fontFamily: selectedCategory.font }}
              >
                {type.code}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8" style={{ fontFamily: "'Bebas Neue', cursive" }}>あなたのMBTIタイプを調べましょう</h1>
      
      {selectedType ? (
        <DifyLikeUI selectedType={selectedType} onReset={resetSelection} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="w-full max-w-2xl aspect-square relative">
            {showOuterCircle ? renderOuterCircle() : renderInnerCircle()}
          </div>

          <div className="w-full max-w-2xl">
            {selectedCategory ? (
              <Card style={{ backgroundColor: selectedCategory.color, color: selectedCategory.textColor }}>
                <CardHeader>
                  <CardTitle style={{ fontFamily: selectedCategory.font }}>{selectedCategory.name}</CardTitle>
                  <CardDescription style={{ color: selectedCategory.textColor, opacity: 0.8 }}>{selectedCategory.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-lg" style={{ fontFamily: selectedCategory.font }}>タイプを選択してください</p>
                </CardContent>
              </Card>
            ) : (
              <p className="text-center text-lg" style={{ fontFamily: "'Bebas Neue', cursive" }}>カテゴリーを選択してください</p>
            )}
          </div>
        </div>
      )}

      {selectedCategory && !selectedType && (
        <div className="mt-8 text-center">
          <Button onClick={resetSelection} style={{ fontFamily: "'Bebas Neue', cursive" }}>もう一度選び直す</Button>
        </div>
      )}
    </div>
  )
}
