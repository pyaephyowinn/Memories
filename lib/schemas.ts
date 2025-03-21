import z from "zod";

export const customerRegistrationSchema = z
  .object({
    username: z.string().min(4, "Username must be at least 3 characters long."),
    email: z
      .string()
      .min(1, "Email cannot be blank.")
      .email("Please enter a valid email address."),
    phone: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type CustomerRegistrationType = z.infer<
  typeof customerRegistrationSchema
>;

export const ownerRegistrationSchema = customerRegistrationSchema.and(
  z.object({
    businessName: z.string().min(1, "Business name cannot be blank."),
  })
);

export type OwnerRegistrationType = z.infer<typeof ownerRegistrationSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be blank.")
    .email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginType = z.infer<typeof loginSchema>;
