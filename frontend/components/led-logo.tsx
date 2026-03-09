import Image from "next/image"

export function LedLogo({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center w-full ${className}`}>
      <Image
        src="/logo.png"
        alt="LED Logo"
        width={220}
        height={83}
        className="h-full w-auto object-contain mx-auto"
        priority
      />
    </div>
  )
}
