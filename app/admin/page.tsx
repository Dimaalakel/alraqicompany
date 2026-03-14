import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ArrowRight } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full text-center">
        <div className="bg-secondary p-8 rounded-lg">
          <div className="w-16 h-16 bg-[#1e3a5f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#1e3a5f]" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4">
            إدارة الرسائل
          </h1>
          
          <p className="text-muted-foreground mb-6">
            يتم إرسال جميع رسائل العملاء مباشرة إلى بريدك الإلكتروني. تحقق من صندوق الوارد للاطلاع على الرسائل الجديدة.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white">
              <Link href="mailto:info@alraqicompany.com">
                <Mail className="w-4 h-4 ml-2" />
                فتح البريد الإلكتروني
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="tel:+963986556633">
                <Phone className="w-4 h-4 ml-2" />
                الاتصال بالدعم
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="w-full">
              <Link href="/">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
