export const fetchData = async (url, setState) => {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  setState(data);
};
