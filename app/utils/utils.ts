import React from 'react';
const PAGE_COUNT = 5;
const topCountries = (countriesList: any, page: number) => {
  if (countriesList != undefined)
    return countriesList
      .sort((a: any, b: any) => {
        if (a.TotalConfirmed > b.TotalConfirmed) return -1;
        if (a.TotalConfirmed < b.TotalConfirmed) return 1;
        return 0;
      })
      .slice(0, page * PAGE_COUNT);
};

const sortByKey = (countriesList: any, key: string) => {
  const output = countriesList.sort((a: any, b: any) => {
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  });
  console.log('output', output);
  return output;
};

const filterList = (list: any, text: string): any => {
  const output = list.filter((country: any) =>
    String(country.Country).toLowerCase().startsWith(text.toLowerCase()),
  );
  return output;
};

export {topCountries, filterList, sortByKey};
