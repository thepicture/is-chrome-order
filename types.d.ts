declare module "is-chrome-order" {
  type Headers = Record<string, string> | string[] | Array<[string, string]>;
  type IsChromeOrderOptions = {
    areRawHeaders: boolean;
  };

  function IsChromeOrder(
    headers: Headers,
    options: IsChromeOrderOptions = { areRawHeaders: false }
  ): boolean;

  export = IsChromeOrder;
}
