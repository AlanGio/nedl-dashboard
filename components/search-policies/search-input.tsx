"use client"

import { useRef } from "react"
import { Search, X } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  suggestions?: string[]
  placeholder?: string
}

export function SearchInput({
  value,
  onChange,
  onClear,
  suggestions = [],
  placeholder = "Search...",
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border-0 py-3 px-6 focus:outline-none bg-white"
      />
      <Search className="absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 text-[#449cfb] no-shadow" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-14 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100 no-shadow"
        >
          <X className="h-4 w-4 text-slate-400 no-shadow" />
        </button>
      )}
    </div>
  )
}
