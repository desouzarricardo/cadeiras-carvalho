import os
from rembg import remove

pasta_entrada = "public/images"
pasta_saida = "public/images_sem_fundo"

for raiz, pastas, arquivos in os.walk(pasta_entrada):
    for nome_arquivo in arquivos:
        if nome_arquivo.lower().endswith((".jpg", ".jpeg", ".png")):
            caminho_entrada = os.path.join(raiz, nome_arquivo)

            # Recria a mesma estrutura de subpastas (Presidente, Diretor, etc.) na saída
            subpasta_relativa = os.path.relpath(raiz, pasta_entrada)
            pasta_saida_final = os.path.join(pasta_saida, subpasta_relativa)
            os.makedirs(pasta_saida_final, exist_ok=True)

            nome_saida = os.path.splitext(nome_arquivo)[0] + ".png"
            caminho_saida = os.path.join(pasta_saida_final, nome_saida)

            with open(caminho_entrada, "rb") as f:
                imagem_original = f.read()

            imagem_sem_fundo = remove(imagem_original)

            with open(caminho_saida, "wb") as f:
                f.write(imagem_sem_fundo)

            print(f"Processado: {caminho_entrada} -> {caminho_saida}")

print("Concluído!")