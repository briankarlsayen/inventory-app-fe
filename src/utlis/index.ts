export const proccessLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const utcToLocaleDate = (utcDate: string) => {
  const date = new Date(utcDate);
  const options = {
    timeZone: "Asia/Manila",
  };

  // Using the 'en-CA' locale returns the date in ISO format (YYYY-MM-DD)
  const formattedDate = date.toLocaleDateString("en-CA", options);
  return formattedDate;
};

export const formatPrice = (val: number) => {
  return val.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
};
