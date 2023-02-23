import React from 'react'

interface BTProps {
  imgURL: string
  title: string
}

export const BadgeTile: React.FC<BTProps> = ({ imgURL, title }) => {
  return (
    <div className="flex flex-col gap-2 rounded shadow">
      <img
        src={imgURL}
        alt="Badge Img"
        width={200}
        height={200}
        className="rounded-sm"
      />
      <div className="p-2 font-raj text-lg">{title}</div>
    </div>
  )
}
