import { ClaimDetails } from 'flow/interfaces/shared/claim-details.interface'
import { DefaultButton } from 'components/buttons'
import React from 'react'

interface RowProps {
  alternate: boolean
  data: ClaimDetails
  onPreviewClick: () => void
  onMintClick: () => void
}

export const RedeemRow: React.FC<RowProps> = ({
  alternate,
  data,
  onPreviewClick,
  onMintClick
}) => {
  const rowStyle = alternate
    ? 'flex justify-between gap-5 rounded-md bg-green-500 p-6'
    : 'flex justify-between gap-5 rounded-md bg-green-700 p-6'

  return (
    <div className={rowStyle}>
      <div className="flex min-w-[350px] font-raj text-2xl text-white">
        {data?.isFulfilled ? (
          <p>Claimed</p>
        ) : (
          <DefaultButton text="Ready to Mint" onClick={onMintClick} />
        )}
      </div>
      <div className="flex min-w-[350px] font-raj text-2xl text-white">
        {data?.claimResourceID}
      </div>
      <div className="flex min-w-[350px] font-raj text-2xl text-white">
        {data?.senderAddress}
      </div>
      <div className="flex min-w-[350px] font-raj text-2xl text-white">{}</div>
    </div>
  )
}
