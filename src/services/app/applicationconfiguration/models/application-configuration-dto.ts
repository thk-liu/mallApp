
import type { ObjectExtensionsDto } from './object-extensions-dto';
import type { ClockDto } from './clock-dto';
import type { TimingDto } from './timing-dto';
import type { CurrentTenantDto } from './current-tenant-dto';
import type { MultiTenancyInfoDto } from './multi-tenancy-info-dto';
import type { ApplicationFeatureConfigurationDto } from './application-feature-configuration-dto';
import type { CurrentUserDto } from './current-user-dto';
import type { ApplicationSettingConfigurationDto } from './application-setting-configuration-dto';
import type { ApplicationAuthConfigurationDto } from './application-auth-configuration-dto';
import type { ApplicationLocalizationConfigurationDto } from './application-localization-configuration-dto';
export interface ApplicationConfigurationDto  {
  localization: ApplicationLocalizationConfigurationDto;
  auth: ApplicationAuthConfigurationDto;
  setting: ApplicationSettingConfigurationDto;
  currentUser: CurrentUserDto;
  features: ApplicationFeatureConfigurationDto;
  multiTenancy: MultiTenancyInfoDto;
  currentTenant: CurrentTenantDto;
  timing: TimingDto;
  clock: ClockDto;
  objectExtensions: ObjectExtensionsDto;

}
