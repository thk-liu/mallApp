// export interface ObjectExtensionsDto {
//     modules: any;
//     enums: any;

// }
// export interface ClockDto {
//     kind: string;

// }
// export interface TimingDto {
//     timeZone: TimeZone;

// }
// export interface TimeZone {
//     iana: IanaTimeZone;
//     windows: WindowsTimeZone;

// }

// export interface IanaTimeZone {
//     timeZoneName: string;

// }


// export interface WindowsTimeZone {
//     timeZoneId: string;

// }

// export interface CurrentTenantDto {
//     id?: string;
//     name: string;
//     isAvailable: boolean;
//     /**
//      * 企业logo
//      */
//     logo: string;
//     /**
//     * 友好名称
//     */
//     friendlyName: string;
// }


// export interface MultiTenancyInfoDto {
//     isEnabled: boolean;

// }

// export interface ApplicationFeatureConfigurationDto {
//     values: any;

// }

// export interface CurrentUserDto {
//     isAuthenticated: boolean;
//     id?: string;
//     tenantId?: string;
//     impersonatorUserId?: string;
//     impersonatorTenantId?: string;
//     userName: string;
//     name: string;
//     surName: string;
//     email: string;
//     emailVerified: boolean;
//     phoneNumber: string;
//     phoneNumberVerified: boolean;
//     roles: string[];

// }


// export interface ApplicationSettingConfigurationDto {
//     values: any;

// }


// export interface ApplicationAuthConfigurationDto {
//     policies: any;
//     grantedPolicies: any;

// }

// export interface ApplicationLocalizationConfigurationDto {
//     values: any;
//     languages: any[];
//     currentCulture: CurrentCultureDto;
//     defaultResourceName: string;
//     languagesMap: any[];
//     languageFilesMap: any[];

// }
// export interface CurrentCultureDto {
//     displayName: string;
//     englishName: string;
//     threeLetterIsoLanguageName: string;
//     twoLetterIsoLanguageName: string;
//     isRightToLeft: boolean;
//     cultureName: string;
//     name: string;
//     nativeName: string;
//     dateTimeFormat: DateTimeFormatDto;

// }

// export interface DateTimeFormatDto {
//     calendarAlgorithmType: string;
//     dateTimeFormatLong: string;
//     shortDatePattern: string;
//     fullDateTimePattern: string;
//     dateSeparator: string;
//     shortTimePattern: string;
//     longTimePattern: string;

// }

// export interface ApplicationConfigurationDto {
//     localization: ApplicationLocalizationConfigurationDto | undefined;
//     auth: ApplicationAuthConfigurationDto | undefined;
//     setting: ApplicationSettingConfigurationDto | undefined;
//     currentUser: CurrentUserDto | undefined;
//     features: ApplicationFeatureConfigurationDto | undefined;
//     multiTenancy: MultiTenancyInfoDto | undefined;
//     currentTenant: CurrentTenantDto | undefined;
//     timing: TimingDto | undefined;
//     clock: ClockDto | undefined;
//     objectExtensions: ObjectExtensionsDto | undefined;

// }
