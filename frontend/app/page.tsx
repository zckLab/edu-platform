import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/campo.png"
          alt="Background"
          fill
          className="object-cover blur-[6px] opacity-60"
          priority
        />
        {/* Overlay do gradiente para garantir legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-700">
        <LoginForm />
      </div>
    </main>
  )
}
