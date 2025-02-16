import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  //assigning setting to an empty obj because at start settings are undefined, still loading
  const { isLoading, settings = {} } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    //u have to use [] if u want to pass a parameter instead of just name
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="min-nights"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
