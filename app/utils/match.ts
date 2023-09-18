export const getMapTitle = (name: string) => {
  const title = name.split("_").pop() as string;

  return title.charAt(0).toUpperCase() + title.slice(1);
};
