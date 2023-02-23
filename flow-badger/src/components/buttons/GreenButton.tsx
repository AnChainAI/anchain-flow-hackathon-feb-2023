interface GBProps {
  text?: string
  onClick: () => void
}

export const GreenButton: React.FC<GBProps> = ({ text, onClick }) => {
  return (
    <button
      className="flex h-[50px] w-fit items-center justify-center rounded-[5px] border-[1px] border-solid border-green-700 p-4 text-center font-raj text-green-700 hover:cursor-pointer hover:brightness-75 "
      onClick={onClick}
    >
      {text}
    </button>
  )
}
