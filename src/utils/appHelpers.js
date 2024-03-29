// Method to detect if an object is present into root-array
export const getItemFromArray = (rootArray, itemId) =>
  rootArray?.length ? rootArray?.find((i) => i.id == itemId) : null;

// Method to detect if an object index into root-array
export const findItemIndexFromArray = (rootArray, itemId) =>
rootArray?.length ? rootArray?.findIndex((i) => i.id == itemId) : null;

// scroll to top position
export const scrollToTopMethod = () => {
    if (typeof window !== undefined) {
        return window.scrollTo(0, 0);
    }
};