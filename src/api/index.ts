import { useHttpClient } from '~/composables/useHttpClient';

const httpClient = useHttpClient('https://swapi.dev/api/');

const getPeople = async (pageNumber: number) => {
  const data = await httpClient.get(`people/?page=${pageNumber}`);
  return data;
};

export { getPeople };
