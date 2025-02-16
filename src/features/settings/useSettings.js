import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
export function useSettings() {
  //all these hooks are not just about fetching data but primarily about caching it and reducing amount of fetching
  //here u combine fetching data with caching it
  //basically for each piece of data you want to have own space (storage)
  //each space you need to call and associate with key to access it, cache
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
