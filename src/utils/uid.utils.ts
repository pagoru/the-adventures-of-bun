type UID = number;

export const uidUtils = () => {
  let currentUID: UID = -1;

  const get = (): UID => {
    currentUID += 1;
    return currentUID;
  };

  return {
    get,
  };
};
