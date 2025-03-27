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

export const propertySchema = z.object({
  title: z.string().min(1, "Title cannot be blank."),
  description: z.string().min(1, "Description cannot be blank."),
  streetAddress: z.string().min(1, "Street address cannot be blank."),
  city: z.string().min(1, "City cannot be blank."),
  state: z.string().min(1, "State cannot be blank."),
  price: z.number().min(1, "Price cannot be blank."),
  currency: z.string().optional().default("MMK"),
  zipCode: z.string().min(1, "Zip code cannot be blank."),
  propertyType: z.string().min(1, "Property type cannot be blank."),
  listingType: z.string().min(1, "Listing type cannot be blank."),
  size: z.number().min(1, "Size cannot be blank."),
  bedrooms: z.number().min(1, "Bedrooms cannot be blank."),
  bathrooms: z.number().min(1, "Bathrooms cannot be blank."),
  yearBuilt: z.number().min(1, "Year built cannot be blank."),
  status: z.string().min(1, "Status cannot be blank."),
  features: z.array(z.string()),
  images: z
    .array(z.string())
    .max(10, "You can only upload 10 images.")
    .min(1, "You must upload at least 1 image."),
});

export type PropertyType = z.infer<typeof propertySchema>;
export type PropertyDetailType = PropertyType & {
  id: number;
  owner?: {
    id: number;
    businessName: string;
    taxInformation: string | null;
    licenseNumber: string | null;
    userId: number;
    user?: {
      id: number;
      username: string;
      email: string;
      password: string;
      phone: string;
      twoFAEnabled: boolean;
      role: string;
    };
  };
};

export const appointmentSchema = z.object({
  dateTime: z.date().min(new Date(), "Date cannot be blank."),
  hour: z.number().min(1, "Time cannot be blank.").optional(),
  message: z.string().min(1, "Message cannot be blank."),
});

export type AppointmentType = z.infer<typeof appointmentSchema>;
export type AppointmentDetailType = AppointmentType & {
  id: string;
  name: string;
  email: string;
  phone: string;
  property?: PropertyType;
};
