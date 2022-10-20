export const getCountryFlagURI = (countryName = "") => {
  switch (countryName.toLowerCase()) {
    case "argentina":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/255px-Flag_of_Argentina.svg.png";
    case "chile":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/255px-Flag_of_Chile.svg.png";
    case "espanha":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/200px-Bandera_de_Espa%C3%B1a.svg.png";
    case "brasil":
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png";
  }
};
