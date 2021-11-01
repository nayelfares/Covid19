import React from 'react';

const top5Countries = (countriesList: any) => {
  return countriesList
    .sort((a: any, b: any) => {
      return a.TotalConfirmed < b.TotalConfirmed ? 1 : -1;
    })
    .slice(0, 5);
};

export {top5Countries};
