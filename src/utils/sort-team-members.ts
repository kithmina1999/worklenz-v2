export const sortBySelection = (data: Array<{ selected?: boolean }>) => {
  return [...data].sort((a, b) => {
    if (a.selected && b.selected) return 0;
    if (a.selected) return -1;
    return 1;
  });
};

export const sortByPending = (data: Array<{ is_pending?: boolean }>) => {
  return [...data].sort((a, b) => {
    if (!a.is_pending && !b.is_pending) return 0;
    if (!a.is_pending) return -1;
    return 1;
  });
};
