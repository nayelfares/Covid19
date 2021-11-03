import React from 'react';
const PAGE_COUNT = 5;
const topCountries = (countriesList: any, page: number) => {
  if (countriesList != undefined)
    return countriesList
      .sort((a: any, b: any) => {
        return a.TotalConfirmed < b.TotalConfirmed ? 1 : -1;
      })
      .slice(0, page * PAGE_COUNT);
};

const sortByKey = (countriesList: any, key: string) => {
  const output = countriesList.sort((a: any, b: any) => {
    return a[key] < b[key] ? 1 : -1;
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
