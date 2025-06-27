/* eslint-disable react/prop-types */
import { useCreateGuest } from "./useCreateGuest";
import { useSettings } from "../settings/useSettings";
import { Controller, useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import { useCabins } from "../cabins/useCabins";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";
import { Flag } from "../../ui/Flag";
import { useEffect, useState } from "react";
//import new hook to add new booking

function NewBookingForm() {
  //booking obj structure:
  /**
   * id - auto
   * created_at - auto
   * startDate +
   * endDate +
   * numNights +
   * numGuests +
   * cabinPrice (select like chosenCabin.price)
   * extrasPrice +
   * totalPrice +
   * status - unconfirmed default
   * hasBreakfast +
   * isPaid - false by default
   * observations +
   * cabinId - FOREIGN KEY +
   * guestId - FOREIGN KEY +
   */

  //NAME OF VALUES IN THE FORM MIGHT HAVE TO BE THE SAME AS IN DB

  //TRY CREATE NEW GUEST FIRST? YOU HAVE TO CREATE HOOK TO CREATE NEW GUEST AND API INTERACTION

  //you have to register guest first, then choose cabin and then u can do everythign else
  //as you need to have a guest first to create a booking, maybe it's a good idea to take all the data relevant, then create new guest and only then create the whole booking

  //PLAN:
  //1. add guest function DONE
  //2. create booking DONE
  //3. finish the form with all input areas, consider all the boundaries such as max guests per booking
  //4. automatically calculate the price
  //5. show the final numbers like total price and blah blah blah?...
  //6. finish onSubmit func, make adding guest first and only then create booking
  //7. handle the flag api calls, optimize it, it's
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    watch,
    control,
  } = useForm();
  const { cabins, isLoading } = useCabins();
  const { settings } = useSettings();
  const {
    breakfastPrice,
    maxBookingLength,
    minBookingLength,
    maxGuestsPerBooking,
  } = settings || {};
  const { isAdding, createBooking } = useCreateBooking();
  const { addGuest } = useCreateGuest();
  const { errors } = formState;
  const nationality = watch("nationality");
  const checkInDate = watch("startDate");
  const checkOutDate = watch("endDate");
  const cabinID = watch("cabinId");
  const chosenCabin = (cabins ?? []).find((cabin) => cabin.id == cabinID) || {};

  const diffTime =
    checkInDate && checkOutDate
      ? new Date(checkOutDate) - new Date(checkInDate)
      : 0;

  const nights = diffTime > 0 ? diffTime / (1000 * 60 * 60 * 24) : 0;
  const hasBreakfast = watch("hasBreakfast");

  const extrasPrice = hasBreakfast ? (Number(breakfastPrice) || 0) * nights : 0;
  const totalPrice =
    extrasPrice + (Number(chosenCabin?.regularPrice) || 0) * nights;

  const [debouncedNationality, setDebouncedNationality] = useState(nationality);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNationality(nationality);
    }, 500);

    return () => clearTimeout(handler);
  }, [nationality]);

  const flagUrl = getCountryCode(debouncedNationality);

  // console.log("Calculated values:", {
  //   nights,
  //   breakfastPrice,
  //   regularPrice: chosenCabin?.regularPrice,
  //   extrasPrice,
  //   totalPrice,
  // });

  countries.registerLocale(enLocale);

  function onSubmit(data) {
    const guestData = {
      fullName: data.fullName,
      email: data.email,
      nationalID: data.nationalID,
      nationality: data.nationality,
      countryFlag: getCountryCode(data.nationality),
    };

    // First create guest
    addGuest(guestData, {
      onSuccess: (createdGuest) => {
        // Then create booking with the guest ID
        const bookingData = {
          startDate: data.startDate,
          endDate: data.endDate,
          numNights: nights,
          numGuests: data.numGuests,
          cabinPrice: chosenCabin?.regularPrice,
          extrasPrice,
          totalPrice,
          status: "unconfirmed",
          hasBreakfast: data.hasBreakfast,
          isPaid: false,
          observations: data.observations,
          cabinId: data.cabinId,
          guestId: createdGuest.id, // Use the returned guest ID
        };

        createBooking(bookingData, {
          onSuccess: () => {
            reset();
            toast.success("Booking created successfully!");
          },
        });
      },
      onError: (error) => {
        toast.error("Failed to create guest: " + error.message);
      },
    });
  }

  function getNextDay(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    // console.log(date.toISOString().split("T")[0]);
    return date.toISOString().split("T")[0];
  }

  function getCountryCode(countryName) {
    //here u should convert country name into the code and return the img.
    //then just use this func in the call
    const countryCode = countries
      .getAlpha2Code(countryName, "en")
      ?.toLowerCase();
    console.log(countryCode);
    return countryCode ? `https://flagcdn.com/${countryCode}.svg` : null;
    // return countryCode;
  }

  if (isLoading || !cabins) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="regular">
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow label="ID number" error={errors?.nationalID?.message}>
        <Input
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          {...register("nationality", {
            required: "This field is required",
          })}
        />
        {flagUrl && <Flag src={flagUrl} />}
      </FormRow>

      <FormRow label="Cabin number" error={errors?.cabinId?.message}>
        <Controller
          name="cabinId"
          control={control}
          rules={{ required: "This field is required" }}
          // defaultValue={cabins?.length > 0 ? cabins[0].id : ""}
          defaultValue={cabins[0].id}
          render={({ field }) => (
            <Select
              options={(cabins ?? []).map((cabin) => ({
                value: cabin.id,
                label: cabin.name,
              }))}
              {...field}
            />
          )}
        />
      </FormRow>

      <FormRow label="Check in date" error={errors?.startDate?.message}>
        {/* START DATE PICKER */}

        <Input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Check out date" error={errors?.endDate?.message}>
        {/* END DATE PICKER, min date is the next day after the check in 
        watch the check in date value, calculate the next day after this value, set this date as a mindate prop*/}
        <Input
          min={getNextDay(checkInDate)}
          type="date"
          {...register("endDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        {/* NUMBER OF GUESTS */}
        <Input
          type="number"
          min="1"
          max={maxGuestsPerBooking}
          defaultValue={1}
          {...register("numGuests", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* NUMBER OF NIGHTS TO BE CALCULATED AUTOMATICALLY */}

      <FormRow label="Add breakfast">
        {/* TOGGLE TO INCLUDE BREAKFAST, custom checkbox element */}
        <Input
          type="checkbox"
          style={{ transform: "scale(2)" }}
          {...register("hasBreakfast")}
        />
      </FormRow>

      <FormRow label="Observations">
        {/* OBSERVATIONS TEXTAREA */}
        <Textarea {...register("observations")} />
      </FormRow>

      {/* // console.log("Calculated values:", {
  //   nights,
  //   breakfastPrice,
  //   regularPrice: chosenCabin?.regularPrice,
  //   extrasPrice,
  //   totalPrice,
  // }); */}

      <Heading as="h3">Result</Heading>
      <Heading as="h4">Nights: {nights ? nights : 0}</Heading>
      <Heading as="h4">
        Breakfast price: {breakfastPrice ? breakfastPrice : 0}
      </Heading>
      <Heading as="h4">Extras price: {extrasPrice ? extrasPrice : 0}</Heading>
      <Heading as="h4">Total price: {totalPrice ? totalPrice : 0}</Heading>

      <FormRow>
        <Button type="submit">Create new booking</Button>
        <Button type="reset">Cancel</Button>
      </FormRow>
    </Form>
  );
}

export default NewBookingForm;
