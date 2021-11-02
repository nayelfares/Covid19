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

export {topCountries};
