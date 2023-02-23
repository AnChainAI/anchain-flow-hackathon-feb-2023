interface DFProps {
  fullWidth?: boolean
  text?: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: () => void
}

export const DefaultButton: React.FC<DFProps> = ({
  fullWidth = false,
  type,
  text,
  onClick
}) => {
  return (
    <button
      className={`flex items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-green-700 text-center font-raj text-white hover:cursor-pointer hover:brightness-75 ${
        fullWidth && 'w-full'
      }`}
      style={
        text
          ? { height: '50px', paddingLeft: '42px', paddingRight: '42px' }
          : { width: '32px', height: '32px' }
      }
      onClick={onClick}
      type={type}
    >
      {text && <p className="text-xl font-bold">{text}</p>}
    </button>
  )
}
