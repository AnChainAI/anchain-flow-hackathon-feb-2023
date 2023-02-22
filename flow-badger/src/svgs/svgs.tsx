interface SvgProps {
  className?: string
  height?: string
  viewBox?: string
  width?: string
  fill?: string
}

export const ClearIcon = (props: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.height ? props.height : '32px'}
      viewBox="0 0 24 24"
      width={props.width ? props.width : '32px'}
      fill={props.fill ? props.fill : '#000'}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  )
}

export const ErrorIcon = (props: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.height ? props.height : '24px'}
      viewBox={props?.viewBox ? props.viewBox : '0 0 24 24'}
      width={props.width ? props.width : '24px'}
      fill={props.fill ? props.fill : '#ff2b8a'}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  )
}