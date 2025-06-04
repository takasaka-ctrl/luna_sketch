'use client'

import { useState } from 'react'
import MBTICircleSelector from './mbti-circle-selector'
import SimpleTypeSelector from './simple-type-selector'
import { chatGroups, ChatGroup, ChatType } from './utils/chat-categories'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { DifyLikeUI } from './dify-like-ui'

export default function ChatEntrance() {
  const [group, setGroup] = useState<ChatGroup | null>(null)
  const [type, setType] = useState<ChatType | null>(null)

  const resetAll = () => {
    setGroup(null)
    setType(null)
  }

  if (!group) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Bebas Neue', cursive" }}>カテゴリを選択</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {chatGroups.map(g => (
            <Card
              key={g.id}
              onClick={() => setGroup(g)}
              className="cursor-pointer hover:scale-105 transition"
              style={{ backgroundColor: g.color, color: g.textColor, fontFamily: g.font }}
            >
              <CardHeader>
                <CardTitle>{g.name}</CardTitle>
                <CardDescription className="opacity-80">{g.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (group.id === 'mbti') {
    return <MBTICircleSelector onExit={resetAll} />
  }

  if (type) {
    return <DifyLikeUI selectedType={type} onReset={resetAll} />
  }

  return <SimpleTypeSelector group={group} onSelect={setType} onBack={() => setGroup(null)} />
}
