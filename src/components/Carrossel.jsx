import { useState, useEffect } from 'react'

const slides = [
  { src: "/carrossel/carrossel1.jpeg", alt: "Descrição da foto 1" },
  { src: "/carrossel/carrossel2.jpeg", alt: "Descrição da foto 2" },
  { src: "/carrossel/carrossel3.jpeg", alt: "Descrição da foto 3" },
]

function Carrossel() {
  const [atual, setAtual] = useState(0)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    if (pausado) return

    const intervalo = setInterval(() => {
      setAtual((anterior) => (anterior + 1) % slides.length)
    }, 4000)

    return () => clearInterval(intervalo)
  }, [atual, pausado])

  const anterior = () => setAtual((a) => (a - 1 + slides.length) % slides.length)
  const proximo = () => setAtual((a) => (a + 1) % slides.length)

  return (
    <section
      className="carrossel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div
        className="carrossel-trilho"
        style={{ transform: `translateX(-${atual * 100}%)` }}
      >
        {slides.map((slide) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="carrossel-imagem"
            draggable={false}
          />
        ))}
      </div>

      <button className="carrossel-seta carrossel-seta-esq" onClick={anterior} aria-label="Imagem anterior">‹</button>
      <button className="carrossel-seta carrossel-seta-dir" onClick={proximo} aria-label="Próxima imagem">›</button>

      <div className="carrossel-pontos">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            className={i === atual ? 'ponto ativo' : 'ponto'}
            onClick={() => setAtual(i)}
            aria-label={`Ir para a imagem ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Carrossel