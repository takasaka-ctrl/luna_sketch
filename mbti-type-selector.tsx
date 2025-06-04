'use client'

import React, { useState } from 'react'
import { mbtiCategories, MBTICategory, MBTIType } from './utils/mbti'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MBTITypeSelector() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<MBTICategory | null>(null)
  const [selectedType, setSelectedType] = useState<MBTIType | null>(null)

  const handleCategorySelect = (category: MBTICategory) => {
    setSelectedCategory(category)
    setStep(2)
  }

  const handleTypeSelect = (type: MBTIType) => {
    setSelectedType(type)
    setStep(3)
  }

  const resetSelection = () => {
    setStep(1)
    setSelectedCategory(null)
    setSelectedType(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">あなたのMBTIタイプを調べましょう</h1>
      
      {step === 1 && (
        <div>
          <p className="text-xl text-center mb-6">まずは4つの大分類のうち、最も近いと感じるものを選択してください。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mbtiCategories.map((category) => (
              <Card key={category.name} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCategorySelect(category)}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{category.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 2 && selectedCategory && (
        <div>
          <p className="text-xl text-center mb-6">
            あなたは{selectedCategory.name}を選択しました。より具体的なタイプを選んでください。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCategory.types.map((type) => (
              <Card key={type.code} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTypeSelect(type)}>
                <CardHeader>
                  <CardTitle>{type.code} ({type.name})</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{type.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 3 && selectedType && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">あなたのMBTIタイプは:</h2>
          <p className="text-3xl font-bold mb-2">{selectedType.code} ({selectedType.name})</p>
          <p className="text-xl mb-6">{selectedType.description}</p>
          <Button onClick={resetSelection}>もう一度選び直す</Button>
        </div>
      )}
    </div>
  )
}
