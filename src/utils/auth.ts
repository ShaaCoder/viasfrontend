import { mockUsers } from '../store/authStore';

export const validateCredentials = (phone: string, otp: string) => {
  const user = mockUsers[phone as keyof typeof mockUsers];
  return user && otp === '123456' ? user : null;
};

export const isValidPhone = (phone: string) => {
  return /^\d{10}$/.test(phone);
};

export const isValidOTP = (otp: string) => {
  return /^\d{6}$/.test(otp);
};