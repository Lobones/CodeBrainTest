<p align="center">
  <img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/index-1.png?raw=true" alt="Index"/>
</p>

# Moderno. Clean. Fluído.

Esse projeto foi feito com o intuito de ser aplicado ao teste proposto para ingressar na empresa CodeBrain.

<img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/new-sale.png?raw=true" alt="NewSale" style="height: 440px; width: 735px;"/>
<img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/new-operator.png?raw=true" alt="NewOp" style="height: 440px; width: 735px;"/>
<img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/sales.png?raw=true" alt="Sales" style="height: 440px; width: 735px;"/>
<img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/operators.png?raw=true" alt="Ops" style="height: 440px; width: 735px;"/>
<img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/products.png?raw=true" alt="Prods" style="height: 440px; width: 735px;"/>

### Pontos Principais:

- [x] - Totalmente Responsível.

<p align="center">  <img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/mobile-5.png?raw=true" alt="Prods" style="height: 556px; width: 295px; borderRadius: 15px;"/>
  <img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/mobile-6.png?raw=true" alt="Prods" style="height: 556px; width: 295px; borderRadius: 15px;"/></p>

- [x] - Design Limpo e Sofisticado.

<img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/index-2.png?raw=true" alt="Index2" style="height: 440px; width: 735px;"/>
<img src="https://github.com/Lobones/CodeBrainTest/blob/master/frontend/public/images/new-sale.png?raw=true" alt="NewSale" style="height: 440px; width: 735px;"/>

- [x] - Feito em 1 semana utilizando: ReactJS, NextJS, ChakraUI, Java, Spring Boot, MongoDB e Docker.

# Como executar em meu computador?

Para executar uma versão do projeto em seu computador:

Você precisa baixar o arquivo [docker-compose.yaml](https://github.com/Lobones/CodeBrainTest/blob/master/docker-compose.yaml) e executar o comando ```docker compose up``` no mesmo diretório onde está localizado o arquivo.

Após o backend estar funcionando corretamente você pode então entrar na pasta 'frontend' e digitar ```npm i``` para instalar os modulos, em seguida utilize o comando ```npm run dev```.

Para concluir a configuração do ambiente, você deve acessar em seu navegador [localhost:3000/about](http://localhost:3000/about) e clicar no botão ```Gerar operadores, produtos e vendas``` uma vez. 

Agora, se tudo ocorrer como deveria, você já deve poder acessar a [página principal (localhost:3000)](http://localhost:3000) e explorar a aplicação.

# Endpoints

### ```/api/v1``` é a URL principal onde:

```/operators``` localiza-se os controladores de serviço do modelo Operator tais como:
* ```/{id}``` recebe o `id` retorna o operador que possui esse `id` caso exista um
* ```/getAll``` retorna todos os operadores
* ```/getTopSale/{type}``` retorna o operador com melhor atributo pelo variável {`type`} (BY_AMOUT | BY_EARNINGS)
* ```/new``` recebe `firstName e lastName`  como parâmetros obrigatórios, podendo também receber `id e sales` como body e retorna o `id` final do novo operador
* ```/delete/{id}``` recebe o `id` do operador e retorna OK caso bem sucedido ao remover completamente os dados do operador

```/products``` localiza-se os controladores de serviço do modelo Product tais como:
* ```/{id}``` recebe o `id` retorna o produto que possui esse id caso exista um
* ```/getAll``` retorna todos os produtos
* ```/getTopAverageTicket``` retorna o produto com maior ticket médio
* ```/getLowStock``` retorna os 3 produtos com o menor estoque
* ```/new``` recebe `title, description, price e stock` como parâmetros obrigatórios, podendo também receber `id e sales` como body e retorna o `id` final do novo produto
* ```/delete/{id}``` recebe o `id` do produto e retorna OK caso bem sucedido ao remover completamente os dados do produto

```/sales``` localiza-se os controladores de serviço do modelo Sale tais como:
* ```/{id}``` recebe o `id` retorna a venda que possui esse id caso exista uma
* ```/getAll``` retorna todas as vendas
* ```/getTopSaleByPrice``` retorna a venda com o valor mais alto
* ```/new``` recebe `operatorId, products` como parâmetros obrigatórios, podendo também receber `id` como body e retorna o `id` final da nova venda (o parâmetro products recebe uma lista ```[id do produto]:[quantidade]``` e calcula o preço salvando no modelo na variável `totalPrice`)
* ```/delete/{id}``` recebe o `id` da venda e retorna OK caso bem sucedido ao remover completamente os dados do venda, inclusive adicionando novamente a quantidade dos produtos utilizadas nessa mesma venda e removendo a venda do operador
