import React from 'react'

type Props = {
    onClick:React.MouseEventHandler<HTMLButtonElement> | undefined
    children:React.ReactNode
}

export function LeftMenuButton({onClick,children}: Props) {
  return (
    <button onClick={onClick} className="p-4 w-full flex gap-x-2 hover:bg-gray-100 border-b border-solid border-gray-100 cursor-pointer text-left">
    {children}
  </button>
  )
}