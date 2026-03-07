import Image from "next/image"

export function LedLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="LED Logo"
        width={300}
        height={100}
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  )
}
