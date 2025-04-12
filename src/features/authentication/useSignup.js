import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (user) => {
      console.log(user);
      toast.success("New account created, please confirm sign up via email");
    },
    // onError: (error) => {
    //   toast.error(error.message);
    // },
  });

  return { signup, isLoading };
}
