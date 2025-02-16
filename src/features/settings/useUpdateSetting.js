import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  //here you edit cabin and pass new cabin data to update along with id
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("settings successfuly updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
