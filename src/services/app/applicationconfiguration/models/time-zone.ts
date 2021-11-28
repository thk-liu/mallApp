
import type { WindowsTimeZone } from './windows-time-zone';
import type { IanaTimeZone } from './iana-time-zone';
export interface TimeZone  {
  iana: IanaTimeZone;
  windows: WindowsTimeZone;

}
