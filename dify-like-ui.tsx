import React, { useState, useCallback, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { ChatType } from './utils/chat-categories'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AIInputWithFile } from '@/components/ui/ai-input-with-file'
import { Plus, Minus, RotateCcw, Palette } from 'lucide-react'
import { Particles } from "@/components/ui/particles"
import { Noto_Sans_JP } from 'next/font/google'
import { Slider } from "@/components/ui/slider"

interface TopicBox {
  id: string;
  title: string;
  summary: string;
  position: { x: number; y: number };
}

interface DifyLikeUIProps {
  selectedType: ChatType
  onReset: () => void
}

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

const DifyLikeUI: React.FC<DifyLikeUIProps> = ({ selectedType, onReset }) => {
  const [topicBoxes, setTopicBoxes] = useState<TopicBox[]>([])
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedTopic, setSelectedTopic] = useState<TopicBox | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [comments, setComments] = useState<{ id: string; topicId: string; text: string; position: { x: number; y: number } }[]>([]);
  const [backgroundColor, setBackgroundColor] = useState({ r: 255, g: 255, b: 255 })
  const [showColorPicker, setShowColorPicker] = useState(false);

  const generateRandomPosition = (existingPositions: { x: number; y: number }[]): { x: number; y: number } => {
    const minDistance = 200; // Minimum distance between topic boxes
    let newPosition;
    do {
      newPosition = {
        x: Math.random() * 1600 - 800, // Range: -800 to 800
        y: Math.random() * 1600 - 800, // Range: -800 to 800
      };
    } while (existingPositions.some(pos =>
      Math.sqrt(Math.pow(pos.x - newPosition.x, 2) + Math.pow(pos.y - newPosition.y, 2)) < minDistance
    ));
    return newPosition;
  };

  const addTopicBox = useCallback((title: string, summary: string) => {
    const newTopicBox: TopicBox = {
      id: nanoid(),
      title,
      summary,
      position: generateRandomPosition(topicBoxes.map(box => box.position)),
    }
    setTopicBoxes(prevTopicBoxes => [...prevTopicBoxes, newTopicBox])
  }, [topicBoxes])

  const handleTopicBoxDrag = useCallback((id: string, newPosition: { x: number, y: number }) => {
    setTopicBoxes(prevTopicBoxes =>
      prevTopicBoxes.map(box =>
        box.id === id
          ? { ...box, position: newPosition }
          : box
      )
    )
  }, [])

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setDragging(true)
    setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y })
  }, [position])

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (dragging) {
      requestAnimationFrame(() => {
        setPosition({
          x: event.clientX - dragStart.x,
          y: event.clientY - dragStart.y
        })
      })
    }
  }, [dragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setDragging(false)
  }, [])

  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault()
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const zoom = Math.exp(-event.deltaY * 0.001)
    const newScale = Math.min(Math.max(0.25, scale * zoom), 4)

    setScale(newScale)
    setPosition(prev => ({
      x: prev.x - (mouseX - rect.width / 2) * (zoom - 1),
      y: prev.y - (mouseY - rect.height / 2) * (zoom - 1)
    }))
  }, [scale])

  const handleZoom = useCallback((delta: number) => {
    setScale(prev => Math.min(Math.max(0.25, prev + delta), 4))
  }, [])

  const resetZoom = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleSubmit = (message: string, file?: File) => {
    if (message.trim() && selectedTopic) {
      const newComment = {
        id: nanoid(),
        topicId: selectedTopic.id,
        text: message,
        position: {
          x: selectedTopic.position.x + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 80),
          y: selectedTopic.position.y + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 80),
        },
      };
      setComments(prevComments => [...prevComments, newComment]);
      console.log(`New comment for topic "${selectedTopic.title}": ${message}`);
    }
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  useEffect(() => {
    addTopicBox("AIが仕事に与える影響", "人工知能が雇用市場と労働力のダイナミクスをどのように再形成しているかを探る。");
    addTopicBox("気候変動対策", "地球温暖化に対抗し、持続可能性を促進するための革新的なアプローチ。");
    addTopicBox("宇宙探査の breakthrough", "宇宙に関する理解を深める最近の発見と進歩。");
    addTopicBox("仮想通貨のトレンド", "デジタル通貨とブロックチェーン技術の最新動向の分析。");
    addTopicBox("パンデミックへの備え", "COVID-19から学んだ教訓と将来の世界的な健康危機に対する戦略。");
  }, []);

  const ColorPicker = () => (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-30"
        onClick={() => setShowColorPicker(!showColorPicker)}
      >
        <Palette className="h-4 w-4" />
      </Button>
      {showColorPicker && (
        <Card className="fixed bottom-16 right-4 z-30 w-64 p-4">
          <h4 className="font-medium leading-none mb-2">背景色</h4>
          <p className="text-sm text-muted-foreground mb-4">
            背景色を調整します
          </p>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="r">R</label>
              <Slider
                id="r"
                min={0}
                max={255}
                step={1}
                value={[backgroundColor.r]}
                onValueChange={(value) => setBackgroundColor(prev => ({ ...prev, r: value[0] }))}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="g">G</label>
              <Slider
                id="g"
                min={0}
                max={255}
                step={1}
                value={[backgroundColor.g]}
                onValueChange={(value) => setBackgroundColor(prev => ({ ...prev, g: value[0] }))}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="b">B</label>
              <Slider
                id="b"
                min={0}
                max={255}
                step={1}
                value={[backgroundColor.b]}
                onValueChange={(value) => setBackgroundColor(prev => ({ ...prev, b: value[0] }))}
                className="col-span-2"
              />
            </div>
          </div>
        </Card>
      )}
    </>
  );

  return (
    <div 
      className={`fixed inset-0 overflow-hidden ${notoSansJP.className}`} 
      ref={containerRef}
      style={{
        backgroundColor: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`,
      }}
    >
      <Particles
        className="fixed inset-0 w-full h-full pointer-events-none"
        quantity={300}
        staticity={50}
        ease={50}
        color="#000000"
      />
      <div
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          width: '200%',
          height: '200%',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center',
          cursor: dragging ? 'grabbing' : 'grab',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {topicBoxes.map((topicBox) => (
          <Card
            key={topicBox.id}
            className="absolute w-64 cursor-pointer bg-white shadow-md rounded-lg overflow-hidden"
            style={{
              position: 'absolute',
              left: `calc(50% + ${topicBox.position.x}px)`,
              top: `calc(50% + ${topicBox.position.y}px)`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => setSelectedTopic(topicBox)}
            onMouseDown={(e) => {
              e.stopPropagation()
              const startX = e.clientX
              const startY = e.clientY
              const startLeft = topicBox.position.x
              const startTop = topicBox.position.y

              const handleMouseMove = (e: MouseEvent) => {
                const dx = e.clientX - startX
                const dy = e.clientY - startY
                const newX = startLeft + dx / scale
                const newY = startTop + dy / scale
                handleTopicBoxDrag(topicBox.id, { x: newX, y: newY })
              }

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
              }

              document.addEventListener('mousemove', handleMouseMove)
              document.addEventListener('mouseup', handleMouseUp)
            }}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-medium">{topicBox.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-600">{topicBox.summary}</p>
            </CardContent>
          </Card>
        ))}
        {comments.map((comment) => (
          <Card
            key={comment.id}
            className="absolute w-48 bg-white shadow-sm rounded-lg overflow-hidden"
            style={{
              position: 'absolute',
              left: `calc(50% + ${comment.position.x}px)`,
              top: `calc(50% + ${comment.position.y}px)`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            <CardContent className="p-3">
              <p className="text-xs text-gray-700">{comment.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed top-4 left-4 z-20 flex items-center space-x-2 bg-white bg-opacity-80 rounded-lg shadow-md p-2">
        <Button onClick={() => handleZoom(-0.1)} size="sm" variant="outline" className="text-gray-700">
          <Minus className="h-4 w-4" />
        </Button>
        <Button onClick={resetZoom} size="sm" variant="outline" className="text-gray-700">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button onClick={() => handleZoom(0.1)} size="sm" variant="outline" className="text-gray-700">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button className="fixed top-4 right-4 z-20 bg-white bg-opacity-80 text-gray-700" onClick={onReset}>
        リセット
      </Button>

      {selectedTopic && (
        <div className="fixed bottom-4 left-4 right-4 z-20">
          <AIInputWithFile
            onSubmit={handleSubmit}
            placeholder={`${selectedTopic.title}についてコメントを追加...`}
            className="bg-white bg-opacity-80 shadow-lg rounded-lg"
          />
        </div>
      )}

      <ColorPicker />
    </div>
  )
}

export { DifyLikeUI };
