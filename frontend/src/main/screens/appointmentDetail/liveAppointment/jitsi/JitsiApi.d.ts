/**
 * See https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html
 * https://stackoverflow.com/questions/63189533/how-can-i-solve-error-this-expression-is-not-constructable
 */

export = JitsiApi;

declare class JitsiApi {
  constructor(domain: string, options: Record<string, any>);
  on(event: string, callback: (data: Record<string, string>) => void): void;
  dispose(): void;
}
