import create from 'zustand';
const useStore = create(set => ({
  countries: [],
  setCountries: (newCountries: any) =>
    set(() => ({
      countries: newCountries,
    })),
}));

export default useStore;
