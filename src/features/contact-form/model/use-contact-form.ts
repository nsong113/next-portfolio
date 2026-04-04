"use client";

import { useState, type SubmitEventHandler } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

type UseContactFormOptions = {
  onSubmitResult?: (result: ContactSubmitResult) => void;
};

export function useContactForm(options?: UseContactFormOptions) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
        options?.onSubmitResult?.({ ok: true });
        return;
      }

      options?.onSubmitResult?.({
        ok: false,
        error:
          typeof data.error === "string"
            ? data.error
            : "전송에 실패했어요. 잠시 후 다시 시도해 주세요.",
      });
    } catch {
      options?.onSubmitResult?.({
        ok: false,
        error: "네트워크 오류가 났어요. 연결을 확인해 주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, handleInputChange, handleSubmit, isSubmitting };
}
