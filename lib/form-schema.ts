import * as z from "zod";

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "First Name is required" }),

  lastname: z.string().optional(),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),

  contactno: z
  .string()
  .min(1, { message: "Contact number is required" })
  .max(10, {message: "Contact number must be 10 digits"})
  .regex(/^\d+$/, { message: "Contact number must be numeric" }),

  country: z.string().min(1, { message: "Please select a country" }),

  city: z.string().min(1, { message: "Please select a city" }),

  // vehicles array is for the dynamic fields
  vehicles: z.array(
    z.object({
      vehicleType: z
        .string()
        .min(1, { message: "Please select a vehicle type" }),

      makeAndModel: z
        .string()
        .min(1, { message: "Make and Model must be specified" }),

      vehicleYear: z
      .string(),

      licensePlateNumber: z
        .string()
        .min(1, { message: "License Plate Number is required" }),

      seatsAvailable: z
      .string()
      .refine(val => ['1', '2', '3', '4', '5'].includes(val), {
        message: "Seats available must be between 1 and 5" }),

      vehicleCondition: z
      .enum(["Excellent", "Good", "Fair", "Poor"], {
        message: "Please select a vehicle condition" }),
      }),
    ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;