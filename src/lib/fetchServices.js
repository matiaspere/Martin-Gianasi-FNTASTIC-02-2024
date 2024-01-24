export const fetchServices = async (businessId, setServices) => {
  const response = await fetch(`/api/services?businessId=${businessId}`);
  const data = await response.json();

  console.log(data);
  setServices(data);
};
