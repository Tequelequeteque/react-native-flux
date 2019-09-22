# react-native-flux
Projeto focado no aprendizado de Arquitetura Flux e React-hooks

## Get Started

- Primeiro deve ter algum emulador de android instalado, 
[tutorial](https://docs.rocketseat.dev/ambiente-react-native/introducao) de como instalar e configurar o ambiente.
- Instalando as dependencias com `yarn` ou `npm -i`, necessário ter o [node](https://nodejs.org/) instalado.
- Abrir um emulador e rodar o seguinte comando `adb reverse tcp:3333 tcp:3333`
- Rodar o comando `yarn start` ou `npm start`
- Inicializar o servidor json com o comando `yarn json-server server.json -p 3333` ou `npx json-server server.json -p 3333`
- E finalmente executar `yarn react-native [run-android|run-ios]` ou `npx react-native [run-android|run-ios]`
  - Obs.: Escolha um `run-android` ou `run-ios`

## Funcionalidades

Foi desenvolvido uma aplicação para simular a venda e estoque de produtos em um carrinho virtual 
com finalidade desses dados interagirem em components diferentes mas mantendo a consistencia entre eles.

Todos os components foi desenvolvidos usando React-hooks para diminuir a verbosidade dos components.

#### Principais bibliotecas usadas.
 - [React Native](https://facebook.github.io/react-native/)
 - [Redux](https://redux.js.org/)
 - [Redux Saga](https://redux-saga.js.org/)

## Demonstração
![](./redux-native.gif)
