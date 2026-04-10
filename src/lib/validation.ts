import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export const checkoutSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number'),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  address: z.string().min(1, 'Address is required').max(200),
  apartment: z.string().max(100).optional(),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  zip: z.string().min(5, 'Please enter a valid ZIP code').max(20),
  country: z.string().min(1, 'Country is required'),
  cardNumber: z
    .string()
    .min(13, 'Please enter a valid card number')
    .max(19)
    .regex(/^[\d\s]+$/, 'Please enter a valid card number'),
  expiry: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter MM/YY format'),
  cvc: z
    .string()
    .min(3, 'CVC must be 3-4 digits')
    .max(4)
    .regex(/^\d+$/, 'Please enter a valid CVC'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
