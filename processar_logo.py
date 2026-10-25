import io
from rembg import remove
from PIL import Image

with open("public/logo.jpeg", "rb") as arquivo_entrada:
    dados_sem_fundo = remove(arquivo_entrada.read())

imagem = Image.open(io.BytesIO(dados_sem_fundo)).convert("RGBA")

canal_alfa = imagem.split()[-1]
limite_alfa = 200
mascara = canal_alfa.point(lambda p: 255 if p > limite_alfa else 0)
caixa = mascara.getbbox()

margem = 15
if caixa:
    esquerda, topo, direita, baixo = caixa
    esquerda = max(0, esquerda - margem)
    topo = max(0, topo - margem)
    direita = min(imagem.width, direita + margem)
    baixo = min(imagem.height, baixo + margem)
    imagem = imagem.crop((esquerda, topo, direita, baixo))

imagem.save("public/logo.png")
print("Logo processada com sucesso!")