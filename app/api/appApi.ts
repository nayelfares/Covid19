import client from './client';
const endpoint = 'summary';

export const getAllCountries = () => client.get(endpoint);

export default {
  getAllCountries,
};
