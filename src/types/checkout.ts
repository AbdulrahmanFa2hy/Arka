export interface FormData {
  email: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface CheckoutProps {
  onBack?: () => void;
}
