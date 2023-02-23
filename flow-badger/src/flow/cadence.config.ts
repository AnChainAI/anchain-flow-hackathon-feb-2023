import { SetupSoulboundCollection } from './cadence/soulbound/transactions/setup.transaction'
import { CleanUpClaim } from './cadence/claimer/transactions/cleanup-claim.transaction'
import { CreateClaim } from './cadence/claimer/transactions/create-claim.transaction'
import { ClaimBadge } from './cadence/claimer/transactions/claim-badge.transaction'
import { GetBadges } from './cadence/soulbound/scripts/get-badges.script'
import { GetClaims } from './cadence/claimer/scripts/get-claims.script'

export const cadence = {
  scripts: {
    claimer: {
      getClaims: GetClaims
    },
    soulbound: {
      getBadges: GetBadges
    }
  },
  transactions: {
    claimer: {
      cleanupClaim: CleanUpClaim,
      createClaim: CreateClaim,
      claimBadge: ClaimBadge
    },
    soulbound: {
      setup: SetupSoulboundCollection
    }
  }
}
