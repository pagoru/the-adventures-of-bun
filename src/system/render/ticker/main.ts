import { queue } from "./queue";

export const ticker = () => {
  const _queue = queue();

  const load = () => {
    _queue.load();
  };

  return {
    load,

    queue: _queue,
  };
};
