// import { useQuery, useMutation, useQueryClient } from "react-query";
import {useMutation } from "react-query";

import { adminLogin } from "../api/adminApi";

export const useAdmin = () => {
//   const queryClient = useQueryClient();

  const useAdminMutation = () => {
    return useMutation(adminLogin);
  };

  return {useAdminMutation}
};
