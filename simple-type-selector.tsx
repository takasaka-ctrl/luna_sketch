'use client'

import { ChatGroup, TypeOption } from './utils/chat-categories'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
  group: ChatGroup
  onSelect: (type: TypeOption) => void
  onBack: () => void
}

export default function SimpleTypeSelector({ group, onSelect, onBack }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={onBack} variant="ghost" className="mb-4">戻る</Button>
      <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: group.font }}>
        {group.name}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {group.types.map((t) => (
          <Card
            key={t.code}
            onClick={() => onSelect(t)}
            className="cursor-pointer hover:shadow-lg transition p-4 text-center"
            style={{ backgroundColor: group.color, color: group.textColor, fontFamily: group.font }}
          >
            <CardHeader className="p-2">
              <CardTitle className="text-xl">{t.name}</CardTitle>
              {t.description && (
                <CardDescription className="text-sm opacity-80">{t.description}</CardDescription>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
