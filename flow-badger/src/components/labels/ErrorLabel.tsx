import { WarningIcon } from "svgs"

interface ELProps {
  message: string
}

export const ErrorLabel: React.FC<ELProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2">
      <WarningIcon />
      <p className="font-raj text-red-600">{message}</p>
    </div>
  )
}