export const getCountryFlagURI = (countryName) => {
  switch (countryName) {
    case "ES":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1920px-Flag_of_Spain.svg.png";
    case "BR":
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png";
  }
};
