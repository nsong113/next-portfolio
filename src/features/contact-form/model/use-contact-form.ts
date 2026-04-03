"use client";

import { useState, type SubmitEventHandler } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type UseContactFormOptions = {
  /** Called after successful native validation when the form is submitted. */
  onCommit?: () => void;
};

export function useContactForm(options?: UseContactFormOptions) {
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

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (options?.onCommit) {
      options.onCommit();
    } else {
      alert("Message sent! (Demo)");
    }
  };

  return { formData, handleInputChange, handleSubmit };
}
