"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"

import { contactSchema, type ContactFormValues } from "@/lib/contact-schema"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type FormState = "idle" | "pending" | "success" | "error"

const SEND_ERROR = "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่ภายหลัง"

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle")
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setState("pending")
    setFormError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const body: {
        message?: string
        errors?: Record<string, string[] | undefined>
      } | null = await response.json().catch(() => null)

      if (!response.ok) {
        if (response.status === 400 && body?.errors) {
          for (const key of Object.keys(body.errors)) {
            const firstMessage = body.errors[key]?.[0]
            if (firstMessage) {
              form.setError(key as keyof ContactFormValues, {
                message: firstMessage,
              })
            }
          }
          setState("idle")
          setFormError("กรุณาตรวจสอบข้อมูลในฟอร์มให้ถูกต้อง")
          return
        }

        setState("error")
        setFormError(body?.message ?? SEND_ERROR)
        return
      }

      setState("success")
      form.reset()
    } catch {
      setState("error")
      setFormError(SEND_ERROR)
    }
  }

  const pending = state === "pending"

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-name">ชื่อ</FieldLabel>
                <Input
                  {...field}
                  id="contact-name"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "contact-name-error" : undefined
                  }
                  placeholder="ชื่อของคุณ"
                />
                {fieldState.invalid && (
                  <FieldError id="contact-name-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-email">อีเมล</FieldLabel>
                <Input
                  {...field}
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "contact-email-error" : undefined
                  }
                  placeholder="you@example.com"
                />
                {fieldState.invalid && (
                  <FieldError id="contact-email-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-subject">หัวข้อ</FieldLabel>
                <Input
                  {...field}
                  id="contact-subject"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "contact-subject-error" : undefined
                  }
                  placeholder="หัวข้อที่ต้องการติดต่อ"
                />
                {fieldState.invalid && (
                  <FieldError
                    id="contact-subject-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-message">ข้อความ</FieldLabel>
                <Textarea
                  {...field}
                  id="contact-message"
                  rows={6}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "contact-message-error" : undefined
                  }
                  placeholder="รายละเอียดข้อความของคุณ"
                />
                {fieldState.invalid && (
                  <FieldError
                    id="contact-message-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <div className="hidden" aria-hidden="true">
            <Field>
              <FieldLabel htmlFor="contact-website">Website</FieldLabel>
              <Input
                id="contact-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...form.register("website")}
              />
            </Field>
          </div>
        </FieldGroup>

        <div
          className="mt-6"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === "success" && (
            <div
              role="status"
              className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success"
            >
              ส่งข้อความเรียบร้อยแล้ว ขอบคุณสำหรับการติดต่อ
            </div>
          )}

          {(state === "error" || (state === "idle" && formError)) &&
            formError && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
              >
                {formError}
              </div>
            )}

          <Button
            type="submit"
            disabled={pending}
            className={cn("mt-4 w-full", pending && "cursor-wait")}
          >
            {pending && <Spinner />}
            {pending ? "กำลังส่ง..." : "ส่งข้อความ"}
          </Button>
        </div>
      </form>
    </div>
  )
}