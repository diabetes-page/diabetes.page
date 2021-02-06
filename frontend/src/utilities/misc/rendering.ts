type Renderable = JSX.Element | (() => JSX.Element);

export const renderIf = (condition: boolean | undefined | null) => (
  then: Renderable,
  butElse?: Renderable,
): JSX.Element | undefined => {
  let toRender = condition ? then : butElse;

  if (typeof toRender === 'function') {
    toRender = toRender();
  }

  return toRender;
};
