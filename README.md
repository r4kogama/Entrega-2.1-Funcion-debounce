# Entrega-2.1-Funcion-debounce

# Comandos de instalacion de TS y Jest

### Si se quiere instalar en global ejecutar estos scripts, la instalacion de npm es mejor en global con esto instalas ultima version npm 

```sh
npm install -g npm@latest
```

### Instalar typescript global [opcional]

```sh
npm i -g typescript
```

## Para proyectos en desarrollo una instalacion en local en el proyecto

### Dentro del proyecto:
### Creacion  package json

```sh
npm init -y
```

### Dependencias y typescripts

```sh
npm i --save-dev typescript
```

### instalar biblioteca TS [tsconfig.json]

```sh
npx tsc --init 
```

### instalar los tipos de node si no lo tiene

```sh
npm install --save-dev @types/node
```

### En el package.json:

```sh

 "scripts":{
	"run:<nombrefichero ts>: "ts-node-<nombrefichero ts> .ts",
	"tsc": "tsc"
}

```

### Instalacion de jest para los test unitarios u otros

```sh
npm install jest -D (desarrollo)
npm install --save-dev ts-jest
```

### instalar tipos de jest para ts

```sh
npm i -D @types/jest ts-jest  
```

### instalar globals de jest

```sh
npm install --save-dev @jest/globals
```

### Si en tu enviorement vas utilizar el DOM, node.js no lo admite, debes instalar el JSDOM (opcional)
```sh
// En la parte superior de tu archivo de test (spec file):
/** @jest-environment jsdom */

npm install jsdom --save-dev

```

### El paquete enviorement jsdom si no esta incluido en Jest hay que instalarlo
```sh
npm install -D jest-environment-jsdom

```

### En el package.json:

```sh

"jest": {
    "preset": "ts-jest",
    "verbose": true,
    "testEnvironment": "node",
    "moduleFileExtensions": [
      "ts", "tsx", "js", "jsx", "json", "node"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/dist/"
    ]
  }

```
### Executar lost test 

```sh
npm run test
```