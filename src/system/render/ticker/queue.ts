import * as PIXI from "libs/pixi.mjs";
import { TickerQueue } from "libs/enums";

type QueueProps = CustomQueue | RepeatQueue | DelayQueue | DurationQueue;

type BaseQueue = {
  id?: number;
  dateTime?: number;
  func: (delta: number) => void | boolean;
};

type CustomQueue = {
  type: TickerQueue.CUSTOM;
} & BaseQueue;

type DelayQueue = {
  type: TickerQueue.DELAY;
  dateTime: number;
  delay: number;
} & BaseQueue;

type DurationQueue = {
  type: TickerQueue.DURATION;
  dateTime: number;
  duration?: number;
} & BaseQueue;

type RepeatQueue = {
  type: TickerQueue.REPEAT;
  dateTime: number;
  repeatEvery?: number;
  repeats?: number;
} & BaseQueue;

export const queue = () => {
  let lastId = 0;
  let queueList: (QueueProps | undefined)[] = [];
  let queueIdToDelete = [];

  const getQueueId = (): number => lastId++;

  const QUEUE_MAP: Record<
    TickerQueue,
    (props: QueueProps, delta: number, index: number) => boolean
  > = {
    [TickerQueue.DELAY]: (
      { dateTime, delay, func }: DelayQueue,
      delta: number,
    ) => {
      const isDone = Date.now() > dateTime + delay;
      if (isDone) func(delta);
      return isDone;
    },
    [TickerQueue.DURATION]: (
      { dateTime, duration, func }: DurationQueue,
      delta: number,
    ) => {
      const isDone = Date.now() > dateTime + duration;
      if (!isDone) func(delta);
      return isDone;
    },
    [TickerQueue.REPEAT]: (
      { dateTime, repeatEvery, func, repeats }: RepeatQueue,
      delta: number,
      index,
    ) => {
      // Repeats are 0 or below
      if (0 >= repeats && repeats !== undefined) return true;
      // It's not yet time to call the func
      if (!(Date.now() > dateTime + repeatEvery)) return false;

      func(delta);
      queueList[index].dateTime = Date.now();
      if (repeats !== undefined) queueList[index]["repeats"] = repeats - 1;

      return false;
    },
    [TickerQueue.CUSTOM]: ({ func }, delta) => Boolean(func(delta)),
  };

  const removeQueueList = () => {
    queueList = queueList.filter(({ id }) => !queueIdToDelete.includes(id));
    queueIdToDelete = [];
  };
  const load = () => {
    PIXI.Ticker.shared.add((delta: number) => {
      removeQueueList();
      let index = 0;
      for (const props of queueList) {
        const v = QUEUE_MAP[props.type](props, delta, index);
        if (v) queueIdToDelete.push(props.id);

        index++;
      }
    });
  };
  const add = (props: QueueProps) => {
    const id = getQueueId();
    queueList.push({ ...props, id });
    return id;
  };

  const remove = (id: number) => queueIdToDelete.push(id);

  return {
    load,

    add,
    remove,
  };
};
