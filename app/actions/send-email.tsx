"use server"

const WEB3FORMS_KEY = "a33b67fe-487e-47c3-a011-162bc27cf45e"

interface ContactFormData {
  name: string
  phone: string
  email: string
  projectType: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  const { name, phone, email, projectType, message } = formData

  if (!name || !phone || !email || !message) {
    return { success: false, error: "يرجى ملء جميع الحقول المطلوبة" }
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `طلب جديد من ${name} - ${projectType || "غير محدد"}`,
        from_name: "موقع شركة الراقي للإنشاءات",
        name,
        phone,
        email,
        "نوع المشروع": projectType || "غير محدد",
        "تفاصيل المشروع": message,
      }),
    })

    const data = await response.json()

    if (data.success) {
      return { success: true }
    } else {
      console.error("[v0] Web3Forms error:", data.message)
      return { success: false, error: data.message || "حدث خطأ أثناء إرسال الرسالة" }
    }
  } catch (err) {
    console.error("[v0] Email send error:", err)
    return { success: false, error: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى." }
  }
}
