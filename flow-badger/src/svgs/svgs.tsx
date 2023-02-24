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

export const WarningIcon = (props: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.height ? props.height : '24px'}
      viewBox={props?.viewBox ? props.viewBox : '0 0 24 24'}
      width={props.width ? props.width : '24px'}
      fill={props.fill ? props.fill : '#dc2626'}
    >
      <path d="M1 21 12 2l11 19Zm3.45-2h15.1L12 6ZM12 18q.425 0 .713-.288Q13 17.425 13 17t-.287-.712Q12.425 16 12 16t-.712.288Q11 16.575 11 17t.288.712Q11.575 18 12 18Zm-1-3h2v-5h-2Zm1-2.5Z" />
    </svg>
  )
}

export const DeleteIcon = (props: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.height ? props.height : '24px'}
      viewBox={props?.viewBox ? props.viewBox : '0 0 24 24'}
      width={props.width ? props.width : '24px'}
      fill={props.fill ? props.fill : 'rgba(0, 0, 0, 0.6)'}
    >
      <path d="m9.4 16.5 2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6L16 9.9l-1.4-1.4-2.6 2.6-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM7 6v13Z" />
    </svg>
  )
}

export const AccountIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="32"
      viewBox="0 96 960 960"
      width="32"
      fill="#009557"
    >
      <path d="M234 780q51-39 114-61.5T480 696q69 0 132 22.5T726 780q35-41 54.5-93T800 576q0-133-93.5-226.5T480 256q-133 0-226.5 93.5T160 576q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340 476q0-59 40.5-99.5T480 336q59 0 99.5 40.5T620 476q0 59-40.5 99.5T480 616Zm0 360q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Z" />
    </svg>
  )
}
