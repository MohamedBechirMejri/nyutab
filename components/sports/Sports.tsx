import React from 'react'
import F1 from './F1'

const Sports = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center p-3">
      <F1 />
    </div>
  )
}

export default Sports
