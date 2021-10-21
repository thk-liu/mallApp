import { observable } from 'mobx'
import { ApplicationConfigurationDto } from 'src/services/configuration'

const applicationConfigurationStore = observable<ApplicationConfigurationDto>({
    localization: undefined,
    auth: undefined,
    setting: undefined,
    currentUser: undefined,
    features: undefined,
    multiTenancy: undefined,
    currentTenant: undefined,
    timing: undefined,
    clock: undefined,
    objectExtensions: undefined,
})

export default applicationConfigurationStore