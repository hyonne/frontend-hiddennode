import Image from "next/image"

export function Cube() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <Image src="/images/pic.gif" alt="Rotating Cube" width={300} height={300} className="object-contain" />
    </div>
  )
}