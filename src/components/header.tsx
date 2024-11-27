import * as React from 'react'
import Link from 'next/link'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-white ">  
      <Link href="/" rel="nofollow" className="mr-2 font-bold">
        Akash AI Lite
      </Link>
      <label className="mr-auto font-normal">
        model:
        <select name="selectedModel">
          <option value="1">Meta-Llama-3-1-8B-Instruct-FP8</option>
          <option value="2">Meta-Llama-3-1-405B-Instruct-FP8</option>
          <option value="3">Meta-Llama-3-2-3B-Instruct</option>
          <option value="4">nvidia-Llama-3-1-Nemotron-70B-Instruct-HF</option>
        </select>
      </label>
    </header>
  )
}
