<p align="center">
  <img src="https://github.com/guiguat/ORDR/blob/master/assets/icon.png" alt="ORDR" style="max-width:100%" width="60"></img>
</p>
<h1 align="center">ORDR - Gerenc. de Pedidos</h1>
<p align="center">
  ORDR é uma aplicação fullstack com base em Nodejs e React-Native que ajuda atendentes de um restaurante a realizar vendas, pedidos e se comunicar com a cozinha de forma ágil além de informar a administração do restaurante, dados sobre a fatura diária do restaurante.
</p>

# Preview
![Preview ORDR Interfaces](https://github.com/guiguat/ORDR/blob/master/assets/Preview.png)

# Instalação

**Para usar essa aplição é necessario ter instalado o NPM e Nodejs em seu computador**

*Para isso, entre nos links a seguir: https://nodejs.org/en/download/ ou https://nodejs.org/en/download/package-manager/#windows* 

Após ter o Node e NPM instalados, clone o repositório e entre na pasta com os comandos:
```bash
git clone https://github.com/guiguat/ORDR
cd ORDR
```

Agora será necessário installar as dependencias de **cada uma das pastas** do projeto:
```bash
cd Ordr #nome da pasta
npm install
```
*Faça isso para todas as pastas dentro da raiz do projeto (OrdrAdmin, Ordr, Ordr_Backend)*

Para poder usar o banco de dados devem ser feitas as migrations:
```bash
cd Ordr_Backend
npx knex migrate:latest
```

:+1: **Depois isso o servidor está pronto para ser usado, ainda na pasta 'Ordr_Backend' execute:**
```bash
npm start #Para produção
#Ou também
npm run dev #Para executar com nodemon (Desenvolvimento)
```

## Configurando o Firebase
**Entre nas pastas Ordr e OrdrAdmin e em cada uma siga os passos:**

Para entrar nas aplicações usando o Firebase Authentication será necessario criar um projeto na plataforma do Firebase e criar um novo aplicativo mobile(Um para a pasta Ordr e outro para a pasta OrdrAdmin), em seguida ativar a autenticação com Email/Password.
Depois, você terá que fazer download do arquivo google-services.json e copiar para a pasta 'Ordr(ou OrdrAdmin)android/app/'

*Para entender melhor como configurar o firebase veja este [Video](https://www.youtube.com/watch?v=MxXyR0CN4v0)*

Após configurado seu firebase e os apps, deixe seu emulador android rodando, entre em uma das pastas(Ordr ou OrdrAdmin) e execute:
```bash
npx react-native run android
```

