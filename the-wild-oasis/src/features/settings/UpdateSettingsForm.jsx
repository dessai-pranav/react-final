import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner.jsx";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getSettings, updateSetting as apiUpdateSetting } from "../../services/apiSettings";

function UpdateSettingsForm() {

    // Load settings
    const { data: settings, isLoading } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });

    // Mutation to update individual setting fields
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: apiUpdateSetting,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] }),
    });

    if (isLoading) return <Spinner />;

    function handleUpdate(field, value) {
        if (!value) return;
        updateSetting({ [field]: value });
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    defaultValue={settings.minBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate("minBookingLength", Number(e.target.value))}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    defaultValue={settings.maxBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate("maxBookingLength", Number(e.target.value))}
                />
            </FormRow>

            <FormRow label="Maximum guests per booking">
                <Input
                    type="number"
                    defaultValue={settings.maxGuestsPerBooking}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate("maxGuestsPerBooking", Number(e.target.value))}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    defaultValue={settings.breakfastPrice}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate("breakfastPrice", Number(e.target.value))}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
