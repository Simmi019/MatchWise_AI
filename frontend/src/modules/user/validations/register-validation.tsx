import {z} from 'zod';
export const registerSchema = z.object({
    email : z.string().min(1, 'Email is Required').email('Please enter valid email'),
    password: z.string().min(8, 'Password must be min 8 chars ').max(20,'Password must be not more than 20 chars'),
    name:z.string().min(3, 'Min Len of Name is 3 chars long').max(10,'Max Len of Name is 10 chars')
});
export const loginSchema = z.object({
    email : z.string().min(1, 'Email is Required').email('Please enter valid email'),
    password: z.string().min(8, 'Password must be min 8 chars ').max(20,'Password must be not more than 20 chars')
    
});
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;