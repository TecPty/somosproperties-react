export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-[#3898EC] mb-4"></div>
        <p className="text-[#999999] text-lg">Cargando propiedad...</p>
      </div>
    </div>
  )
}
