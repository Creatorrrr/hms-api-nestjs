export class GlobalUtil {

  public static readonly PRODUCTION = 'production';
  public static readonly DEVELOPMENT = 'development';

  public static readonly isDev = () => process.env.NODE_ENV !== GlobalUtil.PRODUCTION;

}
