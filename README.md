# SITE — CONTAGEM REGRESSIVA DO WIGOR

Site estático, responsivo e pronto para publicar.

## DATA CONFIGURADA

- **Evento:** discurso público do Wigor
- **Data:** 15 de agosto de 2026
- **Dia:** sábado
- **Horário:** 19h30
- **Fuso usado:** horário de Brasília (`-03:00`)

A contagem regressiva está configurada no arquivo `script.js`:

```javascript
const EVENT_DATE = new Date("2026-08-15T19:30:00-03:00");
```

## COMO ABRIR O SITE NO COMPUTADOR

1. Extraia o arquivo ZIP.
2. Abra a pasta `site-wigor`.
3. Dê dois cliques no arquivo `index.html`.

## COMO ADICIONAR UMA NOVA FOTO

### 1. Coloque a imagem nesta pasta

```text
assets/fotos
```

Exemplo:

```text
assets/fotos/wigor-02.jpg
```

### 2. Abra o arquivo `fotos.js`

Adicione um novo bloco dentro da lista:

```javascript
{
  arquivo: "assets/fotos/wigor-02.jpg",
  data: "2026-07-23",
  legenda: "Faltando cada vez menos!"
},
```

Exemplo com duas fotos:

```javascript
const fotosWigor = [
  {
    arquivo: "assets/fotos/wigor-02.jpg",
    data: "2026-07-23",
    legenda: "Faltando cada vez menos!"
  },
  {
    arquivo: "assets/fotos/wigor-01.png",
    data: "2026-07-22",
    legenda: "Começando a contagem regressiva!"
  }
];
```

A foto com a data mais recente será mostrada como **Foto do dia**.

## ARQUIVOS PRINCIPAIS

```text
site-wigor/
├── index.html
├── style.css
├── script.js
├── fotos.js
├── favicon.png
└── assets/
    └── fotos/
        └── wigor-01.png
```

## PUBLICAÇÃO MAIS FÁCIL

Para publicar rapidamente, use o **Netlify Drop**:

1. Extraia o ZIP.
2. Entre no Netlify.
3. Abra a opção de publicação por arrastar e soltar.
4. Arraste a pasta `site-wigor`.
5. A plataforma fornecerá um link público.

Para atualizar depois, altere os arquivos no computador e envie novamente a pasta atualizada.

## PUBLICAÇÃO PELO GITHUB PAGES

O GitHub Pages é melhor para manter um histórico de todas as atualizações:

1. Crie um repositório público no GitHub.
2. Envie todos os arquivos da pasta `site-wigor`.
3. Abra `Settings`.
4. Entre em `Pages`.
5. Em `Build and deployment`, selecione:
   - `Deploy from a branch`
   - Branch: `main`
   - Pasta: `/ (root)`
6. Salve e aguarde o link ser criado.

## OBSERVAÇÃO DE PRIVACIDADE

Ao publicar, a foto fica acessível para qualquer pessoa que tiver o link — e pode aparecer publicamente dependendo da plataforma e das configurações. Confirme a autorização do Wigor e, caso ele seja menor de idade, também a autorização do responsável.

## ATUALIZAÇÕES DESTA VERSÃO

- A contagem regressiva aparece imediatamente ao abrir o site.
- Tema acrescentado: **“Você tem um objetivo na vida?”**
- A foto principal e a galeria agora aparecem logo depois das informações.
- Mensagem engraçada adicionada ao final do site.


## COMO ADICIONAR UMA NOVA MÚSICA

### 1. Coloque o arquivo nesta pasta

```text
assets/musicas
```

Exemplo:

```text
assets/musicas/musica-calma-02.mp3
```

### 2. Abra o arquivo `musicas.js`

Adicione um bloco dentro da lista:

```javascript
{
  arquivo: "assets/musicas/musica-calma-02.mp3",
  titulo: "Mais calma, Wigor",
  descricao: "Outra música para diminuir a ansiedade."
},
```

A playlist será tocada na ordem em que as músicas aparecem no arquivo.

O navegador não permite iniciar áudio automaticamente sem uma ação da pessoa.
Por isso, a música começa quando o botão **Ativar música** é pressionado.
