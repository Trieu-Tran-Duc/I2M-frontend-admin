import { GroupService } from './GroupService'
import { InfluencerService } from './InfluencerService'
import { ProfileService } from './ProfileService'
import { RestClient } from './RestClient'
import { AuthService } from './AuthService'
import { ConfessionService } from './ConfessionService'
import { AdminService } from './AdminService'

export * from './AuthService'
export * from './RestClient'
export * from './ProfileService'
export * from './InfluencerService'
export * from './GroupService'
export * from './ConfessionService'
export * from './AdminService'

export const restClient = new RestClient()
export const authService = new AuthService(restClient)
export const profileService = new ProfileService(restClient)
export const influencerService = new InfluencerService(restClient)
export const groupService = new GroupService(restClient)
export const confessionService = new ConfessionService(restClient)
export const adminService = new AdminService(restClient)