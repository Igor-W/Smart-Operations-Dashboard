export interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  countryCode: string;
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
}
