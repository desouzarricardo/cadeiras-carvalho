import { WHATSAPP_NUMERO } from "../config"

function CardCadeira({ nome, imagem, onImagemClick }) {
    const mensagem = `Olá! Tenho interesse na ${nome}.`
    const linkWhatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`

    return (
        <div className="card-cadeira">
            <img src={imagem} alt={nome} onClick={onImagemClick} />
            <span className="dica-ampliar">Clique para ampliar</span>
            <div className="card-texto">
                <h3>{nome}</h3>
                <a
                    href={linkWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="botao-whatsapp"
                >
                    <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
                        <path d="M12.004 2C6.477 2 2 6.477 2 12c0 1.63.398 3.221 1.152 4.62L2 22l5.518-1.146C8.858 21.585 10.406 22 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.203c-1.396 0-2.766-.384-3.958-1.111l-.284-.167-2.939.611.622-2.865-.185-.294A8.194 8.194 0 0 1 3.797 12c0-4.529 3.678-8.207 8.207-8.207 4.528 0 8.206 3.678 8.206 8.207 0 4.528-3.678 8.203-8.206 8.203z" />
                        <path d="M9.238 7.412c-.196-.436-.402-.445-.588-.452-.152-.006-.327-.006-.502-.006-.174 0-.458.065-.698.325-.24.26-.916.895-.916 2.183 0 1.288.938 2.532 1.069 2.707.13.174 1.816 2.909 4.491 3.962.686.297 1.221.475 1.638.607.688.219 1.314.188 1.809.114.552-.082 1.7-.694 1.94-1.365.24-.671.24-1.246.168-1.365-.072-.119-.262-.191-.548-.334-.286-.144-1.7-.839-1.964-.935-.264-.096-.456-.144-.648.144-.192.288-.744.935-.912 1.127-.168.192-.336.216-.622.072-.286-.144-1.207-.445-2.3-1.42-.85-.759-1.424-1.697-1.591-1.985-.168-.288-.018-.443.126-.586.129-.129.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.625-1.559-.868-2.131z" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default CardCadeira