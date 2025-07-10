import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShippingForm } from "../components/checkout/ShippingForm";
import { DeliveryOptions } from "../components/checkout/DeliveryOptions";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { OrderReview } from "../components/checkout/OrderReview";
import { CheckoutProps, FormData } from "../types/checkout";
import { toast } from 'react-hot-toast';
import emailjs from "emailjs-com";

const shippingTimes: { [key: string]: string } = {
  "United States": "3-5 business days",
  Canada: "5-7 business days",
  "United Kingdom": "7-10 business days",
  Australia: "10-14 business days",
  Default: "7-14 business days",
};

export default function Checkout({ onBack }: CheckoutProps) {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    address: "",
    city: "",
    country: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedShipping = shippingTimes[formData.country] || shippingTimes.Default;

  const validateForm = () => {
    if (!formData.email || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.name || formData.name.trim().length < 2) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.address || !formData.city || !formData.country) {
      toast.error('Please fill in all address fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const orderId = `${Date.now()}`;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7);

      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const cartItemsDetails = `
        <table border="1" width="100%" cellspacing="0" cellpadding="8">
          <thead>
            <tr style="background-color:#007bff; color:#fff; text-align:left;">
              <th>Product</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${cartItems.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="background-color:#f8f9fa; font-weight:bold;">
            <td style="text-align:center">Order Amount</td>
              <td style="text-align:center" colspan="3">${totalQuantity} items</td>
            </tr>
          </tfoot>
        </table>
      `;

      const emailResponse = await emailjs.send(
        "service_r4j7slo",
        "template_zu6ytio",
        {
          to_name: "Arka Store",
          to_email: 'abdelrhman.fa2hy@gmail.com',  // Add recipient email
          reply_to: formData.email,  // Add reply-to email
          from_name: formData.name,   // Add sender name
          order_id: orderId,
          total: total.toFixed(2),
          cart_items: cartItemsDetails,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          delivery_date: deliveryDate.toDateString(),
        },
        "gQmNXbnFsPC1uoRDM"
      );

      if (emailResponse.status !== 200) {
        throw new Error(`Email sending failed: ${emailResponse.text}`);
      }

      toast.success('Order placed successfully! Check your email for confirmation.');
      
      if (onBack) {
        onBack();
      } else {
        navigate("/");
      }
    } catch (error: any) {
      const errorMessage = error.text || error.message || 'Failed to send order confirmation';
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shopping
        </button>

        {currentStep === 1 ? (
          <OrderReview cartItems={cartItems} onNext={handleNext} />
        ) : (
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-6">
              <form onSubmit={handleSubmit}>
                <ShippingForm 
                  formData={formData}
                  estimatedShipping={estimatedShipping}
                  handleChange={handleChange}
                />
                <DeliveryOptions estimatedShipping={estimatedShipping} />
              </form>
            </div>
            <div className="md:col-span-2">
              <OrderSummary 
                total={total} 
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
