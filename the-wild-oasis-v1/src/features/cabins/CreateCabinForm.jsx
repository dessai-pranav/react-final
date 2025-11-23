import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const { mutate: mutateCabin, isLoading } = useMutation({
        mutationFn: ({ data, id }) => createEditCabin(data, id),
        onSuccess: () => {
            toast.success(isEditSession ? "Cabin updated" : "Cabin created");
            queryClient.invalidateQueries({ queryKey: ["cabin"] });
            reset();
            onCloseModal?.();
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data) {
        // Fix: Correct image handling
        const image =
            typeof data.image === "string"
                ? data.image
                : data.image && data.image.length > 0
                    ? data.image[0]
                    : null;

        const cabinData = {
            ...data,
            maxCapacity: Number(data.maxCapacity),
            regularPrice: Number(data.regularPrice),
            discount: Number(data.discount),
            image,
        };

        if (isEditSession) {
            mutateCabin({ data: cabinData, id: editId });
        } else {
            mutateCabin({ data: cabinData, id: undefined });
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type = {onCloseModal ? 'modal' : 'regular'  }>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    disabled={isLoading}
                    {...register("name", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    disabled={isLoading}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: { value: 1, message: "Capacity must be at least 1" },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    disabled={isLoading}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: { value: 1, message: "Price must be at least 1" },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    disabled={isLoading}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            Number(value) <= Number(getValues().regularPrice) ||
                            "Discount should be less than price",
                    })}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Textarea
                    disabled={isLoading}
                    {...register("description", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    accept="image/*"
                    disabled={isLoading}
                    {...register("image", {
                        required: isEditSession ? false : "Image is required",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button type="reset" variation="secondary" onClick = {() => onCloseModal?.()}>
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
