export interface AdminModuleOptions {
  /** @default '/admin'  */
  path?: string;

  /** currently not working
   *  @default () => true  */
  authenticate?: () => void;
}
