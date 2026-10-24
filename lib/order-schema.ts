import { z } from "zod";

export const orderSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20)
    .regex(/^[+\d][\d\s-]+$/, "Please enter a valid phone number."),
  email: z.string().trim().email("Please enter a valid email address."),
  location: z.string().trim().min(5, "Please share your exact location.").max(300),
  deliveryArea: z.enum(["inside-ktm", "outside-ktm"]),
  size: z.enum(["S", "M", "L"], { error: "Please choose a size." }),
  color: z.enum(["Burgundy", "Navy Blue", "Sky Blue", "Black", "Grey", "Pink", "Purple", "Green", "Other"], { error: "Please choose a color." }),
  customInstructions: z.string().trim().max(500, "Please keep your order instructions under 500 characters.").optional().default(""),
  quantity: z.coerce.number().int().min(1).max(20),
  productName: z.string().trim().min(1),
  clientRequestId: z.string().uuid(),
});

export type OrderInput = z.infer<typeof orderSchema>;
