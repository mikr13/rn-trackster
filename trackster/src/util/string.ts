
export const truncate = (name: string, maxLength: number) => {
  return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
};
