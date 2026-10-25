import { useState, useEffect, useRef } from 'react'
import './App.css'
import CardCadeira from './components/CardCadeira'
import { WHATSAPP_NUMERO } from './config'
import Carrossel from './components/Carrossel'


const cadeiras = [
  { id: 1, nome: "Presidente Gomada Preto", categoria: "Presidente", imagem: "/images/Presidente/Presidente-gomada-preto.png" },
  { id: 2, nome: "Presidente Taça Vermelho", categoria: "Presidente", imagem: "/images/Presidente/Presidente-taca-vermelho.png" },
  { id: 3, nome: "Presidente Gomada Azul", categoria: "Presidente", imagem: "/images/Presidente/Presidente-gomada-azul.png" },
  { id: 4, nome: "Presidente Taça Bege", categoria: "Presidente", imagem: "/images/Presidente/Presidente-taca-bege.png" },
  { id: 5, nome: "Presidente Taça Creme", categoria: "Presidente", imagem: "/images/Presidente/Presidente-taca-creme.png" },
  { id: 6, nome: "Presidente Taurus Marrom", categoria: "Presidente", imagem: "/images/Presidente/Presidente-taurus-marrom.png" },
  { id: 7, nome: "Alto Luxo Taça Courano Marrom", categoria: "Alto Luxo", imagem: "/images/Alto-Luxo/AltoLuxo-taca-marrom.png" },
  { id: 8, nome: "Alto Luxo Taurus Courano Marrom", categoria: "Alto Luxo", imagem: "/images/Alto-Luxo/AltoLuxo-taurus-marrom.png" },
  { id: 9, nome: "Diretor Gomada Preto", categoria: "Diretor", imagem: "/images/Diretor/Diretor-gomada-preto.png" },
  { id: 10, nome: "Diretor Gomada Marrom", categoria: "Diretor", imagem: "/images/Diretor/Diretor-gomada-marrom.png" },
  { id: 11, nome: "Diretor Gomada Azul", categoria: "Diretor", imagem: "/images/Diretor/Diretor-gomada-azul.png" },
  { id: 12, nome: "Diretor Gomada Branco", categoria: "Diretor", imagem: "/images/Diretor/Diretor-gomada-branco.png" },
  { id: 13, nome: "Diretor Gomada Vermelho", categoria: "Diretor", imagem: "/images/Diretor/Diretor-gomada-vermelho.png" },
  { id: 14, nome: "Diretor Taurus Marrom", categoria: "Diretor", imagem: "/images/Diretor/Diretor-taurus-marrom.png" },
  { id: 15, nome: "Diretor Taurus Preto", categoria: "Diretor", imagem: "/images/Diretor/Diretor-taurus-courano.png" },
  { id: 16, nome: "Diretor Taça Vermelho", categoria: "Diretor", imagem: "/images/Diretor/Diretor-taca-vermelho.png" },
  { id: 17, nome: "Diretor Lisa", categoria: "Diretor", imagem: "/images/Diretor/Diretor-lisa.png" },
  { id: 18, nome: "Digitador Gomada Preto", categoria: "Digitador", imagem: "/images/Digitador/Digitador-gomada-preto.png" },
  { id: 19, nome: "Digitador Taça Vermelho", categoria: "Digitador", imagem: "/images/Digitador/Digitador-taca-vermelho.png" },
  { id: 20, nome: "Digitador Taça Bege", categoria: "Digitador", imagem: "/images/Digitador/Digitador-taca-bege.png" },
  { id: 21, nome: "Digitador Lisa", categoria: "Digitador", imagem: "/images/Digitador/Digitador-lisa.png" },
  { id: 22, nome: "Digitador Taurus Marrom", categoria: "Digitador", imagem: "/images/Digitador/Digitador-taurus-marrom.png" },
]

const nomesCategorias = [...new Set(cadeiras.map((cadeira) => cadeira.categoria))]

const categoriasInfo = nomesCategorias.map((nome) => {
  const cadeirasDaCategoria = cadeiras.filter((cadeira) => cadeira.categoria === nome)
  return {
    nome,
    capa: cadeirasDaCategoria[0].imagem,
    quantidade: cadeirasDaCategoria.length,
  }
})

function App() {
  const [imagemAberta, setImagemAberta] = useState(null)
  const [categoriaAtual, setCategoriaAtual] = useState(null)
  const [termoBusca, setTermoBusca] = useState("")
  const [termoBuscaSalvo, setTermoBuscaSalvo] = useState("")
  const [textoDigitado, setTextoDigitado] = useState("")
  const [buscaAberta, setBuscaAberta] = useState(false)
  const [rolando, setRolando] = useState(false)

  const estadoAnterior = useRef(null)

  const emBusca = termoBusca.trim() !== ""
  const naHome = !emBusca && categoriaAtual === null

  const rolarParaCategorias = (suave) => {
    const faixa = document.getElementById('area-produtos')
    if (!faixa) return

    const posicao = Math.ceil(faixa.getBoundingClientRect().bottom + window.scrollY)
    window.scrollTo({ top: posicao, behavior: suave ? 'smooth' : 'auto' })
  }

  useEffect(() => {
    const estadoAtual = `${categoriaAtual}-${emBusca}`

    if (estadoAnterior.current === null) {
      estadoAnterior.current = estadoAtual
      return
    }
    if (estadoAnterior.current === estadoAtual) return
    estadoAnterior.current = estadoAtual

    if (emBusca) {
      document.getElementById('inicio-categorias')?.scrollIntoView()
    } else if (categoriaAtual !== null) {
      document.getElementById('titulo-categoria')?.scrollIntoView()
    } else {
      rolarParaCategorias(false)
    }
  }, [categoriaAtual, emBusca])

  useEffect(() => {
    let temporizador

    const aoRolar = () => {
      setRolando(true)
      clearTimeout(temporizador)
      temporizador = setTimeout(() => setRolando(false), 400)
    }

    window.addEventListener('scroll', aoRolar, { passive: true })

    return () => {
      window.removeEventListener('scroll', aoRolar)
      clearTimeout(temporizador)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = imagemAberta !== null ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [imagemAberta])

  const cadeirasEncontradas = cadeiras.filter((cadeira) =>
    cadeira.nome.toLowerCase().includes(termoBusca.toLowerCase())
  )

  const cadeirasDaCategoriaAtual = cadeiras.filter((cadeira) => cadeira.categoria === categoriaAtual)

  const irParaCategorias = () => rolarParaCategorias(true)

  const confirmarBusca = () => {
    setTermoBuscaSalvo(termoBusca)
    setTextoDigitado("")
    setBuscaAberta(false)
  }

  const cancelarBusca = () => {
    setTermoBusca(termoBuscaSalvo)
    setTextoDigitado("")
    setBuscaAberta(false)
  }

  const alternarBusca = () => {
    if (buscaAberta) {
      cancelarBusca()
    } else {
      setBuscaAberta(true)
    }
  }

  const reiniciarBusca = () => {
    setTermoBusca("")
    setTermoBuscaSalvo("")
    setTextoDigitado("")
    setBuscaAberta(false)
  }

  return (
    <div className='app'>
      <main className={`conteudo${naHome ? '' : ' conteudo-interno'}`}>
        <div className={naHome ? 'palco-topo' : 'palco-topo palco-topo-interno'}>
          <header className={`topo-site${rolando ? ' topo-rolando' : ''}`}>
            <img src="/logo.png" alt="Logotipo Cadeiras Carvalho" className="logo-site" draggable={false} />
            <h1>
              C<span className="sublinhado">adeiras</span><br />
              C<span className="sublinhado">arvalho</span>
            </h1>
          </header>

          {naHome && <Carrossel />}
        </div>

        {naHome && (
          <>
            <section className='faixa-imagem'>
              <h2>Conforto &amp; Comodidade</h2>
            </section>

            <section className='sobre-nos'>
              <p>O seu dia de trabalho merece o suporte perfeito. Nossas cadeiras combinam materiais de alta durabilidade
                e um design sofisticado. É a escolha ideal para transformar o seu escritório em um ambiente de alta produtividade
                e conforto duradouro.</p>

              <button className='botao-saiba-mais' onClick={irParaCategorias}>
                <span className='botao-saiba-mais-texto'>Saiba mais</span>
              </button>
            </section>

            <section className='faixa-produtos' id='area-produtos'>
              <h2>Conheça nossos produtos</h2>
            </section>
          </>
        )}

        <div className='fundo-ondas'>
          {categoriaAtual === null && (
            <div className='linha-categorias' id='inicio-categorias'>
              <h2 className={`titulo-categorias${buscaAberta ? ' titulo-oculto' : ''}`}>Categorias</h2>

              {buscaAberta && (
                <div className='campo-busca'>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16.65" y1="16.65" x2="21" y2="21" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar cadeira..."
                    aria-label="Buscar cadeira"
                    autoFocus
                    value={textoDigitado}
                    onChange={(e) => {
                      setTextoDigitado(e.target.value)
                      setTermoBusca(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        confirmarBusca()
                      } else if (e.key === "Escape") {
                        cancelarBusca()
                      }
                    }}
                  />
                </div>
              )}

              <button
                className="botao-busca"
                onClick={alternarBusca}
                aria-label={buscaAberta ? 'Fechar busca' : 'Abrir busca'}
              >
                {buscaAberta ? (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16.65" y1="16.65" x2="21" y2="21" />
                  </svg>
                )}
              </button>
            </div>
          )}

          {emBusca ? (
            <>
              <div className="wrapper-botao-voltar">
                <button
                  className='botao-voltar'
                  onClick={() => {
                    reiniciarBusca()
                    setCategoriaAtual(null)
                  }}
                >
                  <span className='botao-voltar-texto'>← Voltar às categorias</span>
                </button>
              </div>

              {cadeirasEncontradas.length === 0 ? (
                <p className='busca-nao-encontrada'>Busca não encontrada.</p>
              ) : (
                <>
                  <p className='contagem-resultados'>
                    {cadeirasEncontradas.length}{' '}
                    {cadeirasEncontradas.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                  </p>
                  <div className='catalogo'>
                    {cadeirasEncontradas.map((cadeira) => (
                      <CardCadeira
                        key={cadeira.id}
                        nome={cadeira.nome}
                        imagem={cadeira.imagem}
                        onImagemClick={() => setImagemAberta({ imagem: cadeira.imagem, nome: cadeira.nome })}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : categoriaAtual === null ? (
            <div className='grade-categorias'>
              {categoriasInfo.map((categoria) => (
                <div
                  key={categoria.nome}
                  className='tile-categoria'
                  onClick={() => {
                    reiniciarBusca()
                    setCategoriaAtual(categoria.nome)
                  }}
                >
                  <div className='tile-imagem' style={{ backgroundImage: `url(${categoria.capa})` }} />
                  <div className='tile-texto'>
                    <h2>{categoria.nome}</h2>
                    <span>{categoria.quantidade} modelo{categoria.quantidade > 1 ? 's' : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h2 className="titulo-categoria-atual" id='titulo-categoria'>{categoriaAtual}</h2>
              <div className="wrapper-botao-voltar">
                <button className='botao-voltar' onClick={() => setCategoriaAtual(null)}>
                  <span className='botao-voltar-texto'>← Voltar às categorias</span>
                </button>
              </div>
              <div className='catalogo'>
                {cadeirasDaCategoriaAtual.map((cadeira) => (
                  <CardCadeira
                    key={cadeira.id}
                    nome={cadeira.nome}
                    imagem={cadeira.imagem}
                    onImagemClick={() => setImagemAberta({ imagem: cadeira.imagem, nome: cadeira.nome })}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {imagemAberta && (
        <div className='overlay' onClick={() => setImagemAberta(null)}>
          <button
            className='botao-voltar-overlay'
            onClick={() => setImagemAberta(null)}
            aria-label='Fechar visualização'
          >
            <span className='botao-overlay-texto'>
              <span className='seta-voltar'>←</span>
            </span>
          </button>
          <img src={imagemAberta.imagem} alt={imagemAberta.nome} />
        </div>
      )}

      <section className="cta-contato">
        <div className='cta-contato-texto'>
          <p>Entre em contato e solicite seu orçamento!</p>
          <p className='cta-contato-subtitulo'>Cadeiras Carvalho - 32.369.539/0001-09</p>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="botao-whatsapp"
          aria-label="Falar no WhatsApp"
        >
          <span>Entrar em contato</span>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
            <path d="M12.004 2C6.477 2 2 6.477 2 12c0 1.63.398 3.221 1.152 4.62L2 22l5.518-1.146C8.858 21.585 10.406 22 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.203c-1.396 0-2.766-.384-3.958-1.111l-.284-.167-2.939.611.622-2.865-.185-.294A8.194 8.194 0 0 1 3.797 12c0-4.529 3.678-8.207 8.207-8.207 4.528 0 8.206 3.678 8.206 8.207 0 4.528-3.678 8.203-8.206 8.203z" />
            <path d="M9.238 7.412c-.196-.436-.402-.445-.588-.452-.152-.006-.327-.006-.502-.006-.174 0-.458.065-.698.325-.24.26-.916.895-.916 2.183 0 1.288.938 2.532 1.069 2.707.13.174 1.816 2.909 4.491 3.962.686.297 1.221.475 1.638.607.688.219 1.314.188 1.809.114.552-.082 1.7-.694 1.94-1.365.24-.671.24-1.246.168-1.365-.072-.119-.262-.191-.548-.334-.286-.144-1.7-.839-1.964-.935-.264-.096-.456-.144-.648.144-.192.288-.744.935-.912 1.127-.168.192-.336.216-.622.072-.286-.144-1.207-.445-2.3-1.42-.85-.759-1.424-1.697-1.591-1.985-.168-.288-.018-.443.126-.586.129-.129.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.625-1.559-.868-2.131z" />
          </svg>
        </a>
      </section>

      <footer className="rodape">
        <p>Cadeiras Carvalho® — Todos os direitos reservados. © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App