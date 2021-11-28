
import type { CurrentCultureDto } from './current-culture-dto';
export interface ApplicationLocalizationConfigurationDto  {
  values: any;
  languages: any[];
  currentCulture: CurrentCultureDto;
  defaultResourceName: string;
  languagesMap: any[];
  languageFilesMap: any[];

}
