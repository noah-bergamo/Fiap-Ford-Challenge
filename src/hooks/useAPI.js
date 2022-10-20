import axios from "axios";
import React, { useEffect } from "react";

const useAPI = () => {
  return axios.create({
    baseURL:
      "http://fiapfordclubapp-env.eba-z3ejkr2z.sa-east-1.elasticbeanstalk.com/",
    timeout: 30000,
  });
};

export default useAPI;
