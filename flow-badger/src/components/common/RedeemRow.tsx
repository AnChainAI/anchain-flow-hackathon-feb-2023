import type { ClaimDetails } from 'flow/interfaces/shared/claim-details.interface'
import { WhiteButton, GreenButton } from 'components'
import { convertTimestamp } from 'utils'
import React from 'react'

interface RowProps {
  alternate: boolean
  data: ClaimDetails
  onMintClick: () => void
}

export const RedeemRow: React.FC<RowProps> = ({
  alternate,
  data,
  onMintClick
}) => {
  const rowStyle = alternate
    ? 'flex justify-between gap-5 rounded-md bg-green-500 p-6 items-center'
    : 'flex justify-between gap-5 rounded-md bg-green-700 p-6 items-center'

  const fontStyle = alternate ? 'flex min-w-[300px] font-raj text-2xl text-green-700' : 'flex min-w-[300px] font-raj text-2xl text-white'

  const renderState = () => {
    if (data?.isFulfilled) {
      return <p>Claimed</p>
    } else if(alternate) {
      return <GreenButton text="Ready to Mint" onClick={onMintClick} /> 
    } else {
      return <WhiteButton text="Ready to Mint" onClick={onMintClick} /> 
    }
  }
  return (
    <div className={rowStyle}>
      <div className={fontStyle}>
        {renderState()}
      </div>
      <div className={fontStyle}>
        {data?.name}
      </div>
      <div className={fontStyle}>
        {data?.senderAddress}
      </div>
      <div className={fontStyle}>
        {convertTimestamp(data?.issuedAt)}
      </div>
    </div>
  )
}
