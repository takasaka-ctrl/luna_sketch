import React, { useState } from 'react'
import { MBTIType } from './utils/mbti'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { PlusCircle } from 'lucide-react'

interface Comment {
  id: number;
  content: string;
  position: { x: number; y: number };
}

interface DifyLikeUIProps {
  selectedType: MBTIType
  onReset: () => void
}

export function DifyLikeUI({ selectedType, onReset }: DifyLikeUIProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        content: newComment,
        position: {
          x: Math.random() * 80 + 10, // Random position between 10% and 90%
          y: Math.random() * 80 + 10,
        },
      }
      setComments([...comments, newCommentObj])
      setNewComment('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto relative h-[600px]">
      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 flex flex-col justify-center items-center text-center z-10">
        <CardHeader>
          <CardTitle className="text-2xl">{selectedType.code}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold mb-2">{selectedType.name}</p>
          <p className="text-sm">{selectedType.description}</p>
        </CardContent>
      </Card>

      {comments.map((comment) => (
        <Card
          key={comment.id}
          className="absolute w-48 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${comment.position.y}%`,
            left: `${comment.position.x}%`,
          }}
        >
          <CardContent className="p-2">
            <p className="text-sm">{comment.content}</p>
          </CardContent>
        </Card>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <Input
          className="w-64"
          placeholder="コメントを追加..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={addComment}>
          <PlusCircle className="w-4 h-4 mr-2" />
          追加
        </Button>
      </div>

      <Button className="absolute top-4 right-4" onClick={onReset}>
        もう一度選び直す
      </Button>
    </div>
  )
}
