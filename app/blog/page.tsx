import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "Blog - SOMOS Properties",
  description: "Consejos, noticias y tendencias del mercado inmobiliario en Panamá.",
}

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="py-12 bg-[#fafafa] min-h-screen">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-4">Blog Inmobiliario</h1>
            <p className="text-lg text-[#999999]">Consejos, noticias y tendencias del mercado</p>
          </div>

          <div className="max-w-4xl mx-auto text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-[#cccccc] mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h2 className="text-3xl font-bold text-[#222222] mb-4">Próximamente</h2>
            <p className="text-lg text-[#999999] mb-8">
              Estamos trabajando en contenido de valor para ti. Pronto encontrarás artículos sobre inversión
              inmobiliaria, consejos para compradores y vendedores, y las últimas tendencias del mercado panameño.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
