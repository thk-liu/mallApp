
export interface CurrentTenantDto {
  id?: string;
  name: string;
  isAvailable: boolean;
  /**
   * 企业logo
   */
  logo: string;
  /**
  * 友好名称
  */
   displayName: string;
}
