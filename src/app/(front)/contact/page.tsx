import type { Metadata } from "next";
import {
  Camera,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  ThumbsUp,
} from "lucide-react";
import ContactForm from "@/components/contact-form";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "Contact US",
  description:
    "สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงานผ่านฟอร์มติดต่อของระบบ E-Commerce COSCI",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "ที่อยู่",
    value: "123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
    href: undefined,
  },
  {
    icon: Phone,
    label: "เบอร์โทร",
    value: "02-123-4567",
    href: "tel:021234567",
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: "contact@cosci.com",
    href: "mailto:contact@cosci.com",
  },
  {
    icon: Clock,
    label: "เวลาทำการ",
    value: "จันทร์ - ศุกร์ 09:00 - 18:00 น. (เสาร์ - อาทิตย์ ปิดทำการ)",
    href: undefined,
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: ThumbsUp },
  { label: "Instagram", href: "https://instagram.com", icon: Camera },
  { label: "Twitter", href: "https://twitter.com", icon: MessageCircle },
  { label: "YouTube", href: "https://youtube.com", icon: Play },
];

const faqs = [
  {
    question: "การสั่งสินค้าออนไลน์ใช้เวลากี่วัน?",
    answer:
      "สินค้าจะจัดส่งภายใน 1-2 วันทำการหลังชำระเงินสำเร็จ และใช้เวลาเดินทางอีก 2-3 วันทำการ ขึ้นอยู่กับพื้นที่จัดส่ง",
  },
  {
    question: "มีบริการส่งสินค้าไปต่างประเทศหรือไม่?",
    answer:
      "ขณะนี้ยังให้บริการจัดส่งเฉพาะในประเทศไทยเท่านั้น หากมีคำถามเพิ่มเติมสามารถสอบถามทีมงานผ่านฟอร์มนี้ได้",
  },
  {
    question: "ติดต่อร้านได้เวลาไหนบ้าง?",
    answer:
      "ทีมงานพร้อมให้บริการทุกวันจันทร์ - ศุกร์ ตั้งแต่ 09:00 - 18:00 น. ข้อความที่ส่งนอกเวลาทำการจะได้รับการตอบกลับในวันทำการถัดไป",
  },
  {
    question: "ต้องการขอใบกำกับภาษีทำอย่างไร?",
    answer:
      "กรุณาแจ้งเลขประจำตัวผู้เสียภาษี พร้อมชื่อและที่อยู่ที่ต้องการออกใบกำกับภาษี โดยใส่ไว้ในช่องข้อความของฟอร์มติดต่อ",
  },
];

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="text-center">
            <h1 className="font-heading font-bold text-[2rem] tracking-[-0.01em] sm:text-[2.25rem]/[1.2]">
              Contact US
            </h1>
          <p className="mt-3 text-pretty text-lg text-muted-foreground sm:text-xl">
            สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-heading text-xl font-semibold">ข้อมูลติดต่อ</h2>
            <ul className="mt-6 space-y-4">
              {contactInfo.map((item) => (
                <li
                  key={item.label}
                  className="rounded-lg border border-border bg-card p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/5 text-primary dark:bg-primary/15">
                      <item.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium">{item.label}</h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block break-words text-muted-foreground leading-7 underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 break-words text-muted-foreground leading-7">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold">
                ติดตามเรา
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                  >
                    <link.icon className="size-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold">
                คำถามที่พบบ่อย
              </h2>
              <div className="mt-4 space-y-3">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-lg border border-border bg-card shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span
                        className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground leading-7">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="rounded-lg border border-border bg-card p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)] sm:p-8">
              <h2 className="font-heading text-xl font-semibold">
                ส่งข้อความถึงเรา
              </h2>
              <p className="mt-2 text-muted-foreground">
                กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับโดยเร็วที่สุด
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}