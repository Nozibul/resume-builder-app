export const getItemFromArray = (rootArray, itemId) => rootArray?.length ? rootArray?.find((i) => i.id == itemId) : null;
