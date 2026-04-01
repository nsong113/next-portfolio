"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export function useContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! (Demo)");
  };

  return { formData, handleInputChange, handleSubmit };
}

