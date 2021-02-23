export async function mapPromises<Input, Output>(
  inputs: Promise<Input[]> | Input[],
  callbackfn: (input: Input, index: number) => Promise<Output>,
): Promise<Output[]> {
  const awaitedInputs = await inputs;
  const outputPromises = awaitedInputs.map(callbackfn);

  return Promise.all(outputPromises);
}

export async function eachPromise<Input>(
  inputs: Promise<Input[]> | Input[],
  callbackfn: (input: Input, index: number) => Promise<void>,
): Promise<void> {
  await mapPromises(inputs, callbackfn);
}
