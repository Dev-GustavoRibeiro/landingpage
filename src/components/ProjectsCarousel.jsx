"use client"
/*
  "use client" para poder usar bibliotecas que rodam no navegador (Swiper).
*/
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/*
  Este componente mostra slides de projetos.
  Você pode personalizar a quantidade de slides, conteúdo, etc.
*/

export default function ProjectsCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-full"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="bg-white shadow p-4 rounded">
          <img 
            src="/images/projeto1.jpg" 
            alt="Projeto 1" 
            className="w-full h-48 object-cover rounded" 
          />
          <h3 className="text-lg font-semibold mt-2">Projeto 1</h3>
          <p className="text-sm mt-1">
            Breve descrição do projeto, tecnologias usadas, etc.
          </p>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="bg-white shadow p-4 rounded">
          <img 
            src="/images/projeto2.jpg" 
            alt="Projeto 2" 
            className="w-full h-48 object-cover rounded" 
          />
          <h3 className="text-lg font-semibold mt-2">Projeto 2</h3>
          <p className="text-sm mt-1">
            Breve descrição do projeto, tecnologias usadas, etc.
          </p>
        </div>
      </SwiperSlide>

      {/* Adicione mais slides conforme precisar */}
    </Swiper>
  )
}
