'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { mbtiTypes, MBTIType, isValidMBTIType } from '../utils/mbti'

export default function MBTIChatSelector() {
  const [open, setOpen] = useState(false)
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType['code'] | null>(null)

  const handleSelect = (currentValue: string) => {
    if (isValidMBTIType(currentValue)) {
      setSelectedMBTI(currentValue)
      setOpen(false)
    }
  }

  const handleJoinChat = () => {
    if (selectedMBTI) {
      // Here you would typically navigate to the chat room or open a chat interface
      console.log(`Joining chat room for ${selectedMBTI}`)
      // Example: router.push(`/chat/${selectedMBTI.toLowerCase()}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">MBTI Chat Room Selector</h1>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedMBTI ?? "Select MBTI Type"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search MBTI type..." />
              <CommandEmpty>No MBTI type found.</CommandEmpty>
              <CommandGroup>
                {mbtiTypes.map((type) => (
                  <CommandItem
                    key={type}
                    onSelect={() => handleSelect(type)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedMBTI === type ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {type}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="text-center">
          {selectedMBTI ? (
            <p className="text-sm text-gray-600 mb-2">
              Selected MBTI Type: <span className="font-semibold">{selectedMBTI}</span>
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-2">No MBTI type selected</p>
          )}
        </div>
        <Button
          className="w-full"
          onClick={handleJoinChat}
          disabled={!selectedMBTI}
        >
          Join Chat Room
        </Button>
      </div>
    </div>
  )
}
