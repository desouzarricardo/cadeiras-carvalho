import os
from PIL import Image

pasta = "public/images"
limite_alfa = 200  # pixels com transparência residual abaixo disso são ignorados

for raiz, pastas, arquivos in os.walk(pasta):
    for nome_arquivo in arquivos:
        if nome_arquivo.lower().endswith(".png"):
            caminho = os.path.join(raiz, nome_arquivo)
            imagem = Image.open(caminho).convert("RGBA")

            canal_alfa = imagem.split()[-1]

            # Transforma o canal alfa numa máscara "tudo ou nada":
            # só conta como conteúdo visível o que passar do limite definido
            mascara = canal_alfa.point(lambda p: 255 if p > limite_alfa else 0)
            bbox = mascara.getbbox()

            if bbox:
                margem = 15
                esquerda, topo, direita, base = bbox
                esquerda = max(0, esquerda - margem)
                topo = max(0, topo - margem)
                direita = min(imagem.width, direita + margem)
                base = min(imagem.height, base + margem)

                imagem_cortada = imagem.crop((esquerda, topo, direita, base))
                imagem_cortada.save(caminho)
                print(f"Recortado: {caminho} -> {imagem_cortada.size}")
            else:
                print(f"Aviso: nada detectado em {caminho}")

print("Concluído!")