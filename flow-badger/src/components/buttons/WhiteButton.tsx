interface WBProps {
  text?: string
  onClick: () => void
}

export const WhiteButton: React.FC<WBProps> = ({ text, onClick }) => {
  return (
    <button
      className="flex h-[50px] w-fit items-center justify-center rounded-[5px] border-[1px] border-solid border-white p-4 text-center font-raj text-white hover:cursor-pointer hover:brightness-75 "
      onClick={onClick}
    >
      {text}
    </button>
  )
}
