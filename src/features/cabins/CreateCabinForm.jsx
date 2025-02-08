/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  //if there is an editId then it is an edit session
  const isEditSession = Boolean(editId);
  //getValues() returns an obj which contains all the values of the form which u can use
  //default values when editig session are values which already exist
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const queryClient = useQueryClient();
  const { errors } = formState;
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("new cabin succesfully created");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  //here you edit cabin and pass new cabin data to update along with id
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin was succesfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isLoading = isCreating || isEditing;

  function onSubmit(data) {
    //this is how we pass a data obj because of the image
    //image is being passed in array but we need to take it out and it is at index 0
    // console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image?.[0];
    // console.log(image)
    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image: image });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
        disabled={isLoading}
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum Capacity"
        error={errors?.maxCapacity?.message}
        disabled={isLoading}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity has to be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Price"
        error={errors?.regularPrice?.message}
        disabled={isLoading}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 99,
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
        disabled={isLoading}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "❌ Discount can't be bigger than price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={errors?.description?.message}
        disabled={isLoading}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow
        label="Image"
        error={errors?.image?.message}
        disabled={isLoading}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="">
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
