/* eslint-disable react/prop-types */
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { Controller, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import { useCreateBooking } from "./useCreateBooking";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Flag } from "../../ui/Flag";
import { useCabins } from "../cabins/useCabins";
import Select from "../../ui/Select";
import { useCreateGuest } from "./useCreateGuest";
//import new hook to add new booking

function NewBookingForm() {
  //booking obj structure:
  /**
   * id
   * created_at
   * startDate
   * endDate
   * numNights
   * numGuests
   * cabinPrice
   * extrasPrice
   * totalPrice
   * status
   * hasBreakfast
   * isPaid
   * observations
   * cabinId - FOREIGN KEY
   * guestId - FOREIGN KEY
   */

  //NAME OF VALUES IN THE FORM MIGHT HAVE TO BE THE SAME AS IN DB

  //TRY CREATE NEW GUEST FIRST? YOU HAVE TO CREATE HOOK TO CREATE NEW GUEST AND API INTERACTION

  //come up with a list of cabins to select one like drop down with their names
  //you have to call the hook though

  //guest obj structure:
  /*
  id, created_at, fullName, email, nationalID, nationality, countryFlag */
  //YOU MIGHT NEED TO COME UP WITH THE WAY OF HOW AUTOMATICALLY MAKE A COUNTRY FLAG THING
  //use flagpedia API to get an img, but first you need to get the country code using some library, then when u get the code, u use it in the api call
  //ISO 3166-1 alpha-2 code

  //you have to register guest first, then choose cabin and then u can do everythign else
  //as you need to have a guest first to create a booking, maybe it's a good idea to take all the data relevant, then create new guest and only then create the whole booking

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    watch,
    control,
  } = useForm();
  const { cabins } = useCabins();
  const { isAdding, createBooking } = useCreateBooking();
  const { isLoading, addGuest } = useCreateGuest();
  const { errors } = formState;
  const nationality = watch("nationality");
  countries.registerLocale(enLocale);
  function onSubmit(data) {
    const guestData = {
      fullName: data.fullName,
      email: data.email,
      nationalID: data.nationalID,
      nationality: data.nationality,
      countryFlag: getCountryCode(data.nationality),
    };
    addGuest({ ...guestData }, { onSuccess: () => reset() });
  }

  function getCountryCode(countryName) {
    //here u should convert country name into the code and return it.
    //then just use this func in the call
    const countryCode = countries
      .getAlpha2Code(countryName, "en")
      ?.toLowerCase();
    return countryCode ? `https://flagcdn.com/w320/${countryCode}.svg` : null;
    // return countryCode;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="regular">
      <FormRow
        label="Full name"
        disabled={isAdding}
        error={errors?.fullName?.message}
      >
        <Input
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Email" disabled={isAdding} error={errors?.email?.message}>
        <Input
          {...register("email", {
            required: "This field is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
        />
      </FormRow>
      <FormRow
        label="ID number"
        disabled={isAdding}
        error={errors?.nationalID?.message}
      >
        <Input
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        label="Nationality"
        disabled={isAdding}
        error={errors?.nationality?.message}
      >
        <Input
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* <FormRow
        label="Cabin number"
        disabled={isAdding}
        error={errors?.cabinId?.message}
      >
        <Select
          {...register("cabinId", {
            required: "This field is required",
          })}
          options={(cabins ?? []).map((cabin) => ({
            value: cabin.id,
            label: cabin.name,
          }))}
          defaultValue={cabins?.length > 0 ? cabins[0].id : ""}
        />
      </FormRow> */}
      {/* {nationality && <Flag src={getCountryCode(nationality)} />} */}
      {/* <Input {...register("countryFlag")} type="hidden" /> */}
      <FormRow>
        <Input type="submit" />
      </FormRow>
    </Form>
  );
}

export default NewBookingForm;
