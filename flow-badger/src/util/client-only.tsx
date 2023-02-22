import React, { ReactNode, useEffect, useState } from 'react'

interface ClientOnlyArgs {
  readonly children: ReactNode
}

export function ClientOnly({ children, ...delegated }: ClientOnlyArgs) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <React.Fragment {...delegated}>{children}</React.Fragment>
}
