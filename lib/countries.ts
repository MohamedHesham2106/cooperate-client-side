export const fetchCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all', {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  const loadedCountries = [];
  for (const key in data) {
    loadedCountries.push({
      id: key,
      name: data[key].name.common,
    });
  }
  const countries = loadedCountries.sort((a, b) => (a.name < b.name ? -1 : 1));
  return countries;
};
