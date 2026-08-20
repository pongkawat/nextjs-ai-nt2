import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const validInput = {
  name: "สมชาย",
  email: "somchai@example.com",
  subject: "สอบถามสินค้า",
  message: "ต้องการสอบถามราคาสินค้าเพิ่มเติมครับ",
};

describe("contactSchema", () => {
  it("accepts a valid contact message", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBeUndefined();
    }
  });

  it("rejects a name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "ก" });
    expect(result.success).toBe(false);
  });

  it("rejects a name longer than 100 characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "ก".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a subject shorter than 3 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, subject: "กก" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "สั้นเกิน" });
    expect(result.success).toBe(false);
  });

  it("trims whitespace around values", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "  สมชาย  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("สมชาย");
    }
  });
});