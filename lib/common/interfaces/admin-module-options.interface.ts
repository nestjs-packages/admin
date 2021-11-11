export interface AdminModuleOptions {
  /** @default '/admin'  */
  path?: string;

  /** @default 'Nest.js admin' */
  siteName?: string;

  /** currently not working
   *  @default () => true  */
  authenticate?: () => void;
}
