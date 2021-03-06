La idea de este README es seguir paso a paso el proceso para crear un proyecto desde 0 con las reglas de lintern y de code-fixing necesarios para garantizar el orden y el trabajo colaborativo.

# Lista de pasos para static analysis and testing javascript applications

## Creación del proyecto

```bash
npm init -y
```

## Instalación de dependencias básicas.

```bash
npm i -D @babel/cli @babel/core @babel/preset-env
```

## Creación de .babelrc

Babel es un "compilador" (o transpilador) para JavaScript. Básicamente permite transformar código escrito con las últimas y novedosas características de JavaScript y transformarlo en un código que sea entendido por navegadores más antiguos.

.babelrc

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ]
  ]
}
```

Un preset es un conjunto de plugins, hay varios presets que los desarrolladores de Babel ofrecen y otros creados por la comunidad,

## Agregado de script en package.json

```javascript
"scripts": {
    "build" : "babel src --out-dir dist"
}
```

## Crear un src/example.js

```javascript
stuff
```

## Instalación de eslint

ESLint es una herramienta de código abierto enfocada en el proceso de "lintig" para javascript (o más correctamente para ECMAScript). ESLint es la herramienta predominante para la tarea de "limpiar" código javascript tanto en el servidor (node.js) como en el navegador. Si queres conocer más sobre eslint podes ir a su [sitio web](https://eslint.org/")

```bash
npm i -D eslint
```

Para correr este comando debemos ejecutar:

```bash
npx eslint .
```

### Creación del .eslintrc (configuration file)

Si ejecutamos npx eslint . vemos que nos va a tirar error de constantes y esto sucede porque no tenemos ninguna configuración en el .eslintrc

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "strict": ["error", "never"] // not allow to use use strict in code,
    "valid-typeof": "error",
    "no-unsafe-negation": "error",
    "no-unused-vars": "error",
    "no-unexpected-multiline": "error",
    "no-undef": "error"
  },
  "env": {
    "browser": true // console, navigator, etc
  }
}
```

ESLint tiene muchisimas reglas que pueden configurarse para su proyecto. Para esto, se puede usar la extensión / herencia.

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": ["eslint:recommended"],
  "rules": {
    "strict": ["error", "never"]
  },
  "env": {
    "browser": true
  }
}
```

Y dentro del <b>package.json</b> puede agregarse como script:

```json
"lint": "eslint --ignore-path .gitignore ."
```

El --ignore-path .gitignore le indica al linter que no debe tener en cuenta a la hora de aplicar las reglas los archivos que están dentro del .gitignore

## Prettier

Prettier es un formateador automático de código. Si queres saber más podes ir a su <a href="https://github.com/dileofrancoj/static-analysis-js">sitio web</a>

Toda la configuración de prettier se puede generar de su sitio oficial en su <a href="https://prettier.io/playground/">Playground</a>

En la raíz creamos el archivo: .prettierc

```json
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": true,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

Si agregamos a nuestro package.json el script format:

```json
"prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
"format": "npm run prettier -- --write",
```

y corremos:

```shell
npm run format
```

La configuración será tomada del .prettierc

Una vez configurado todo esto, si vamos a nuestro ejemplo y agregamos un ; extra, estariamos inclumpliendo la regla (no-extra-semi) y eso podemos desactivarlo desde el eslintrc agregando el siguiente elemento a rules:

```json
"rules": {
  "strict": ["error", "never"],
  "no-extra-semi": "off" // here
}
```

Para no repetir esto con cada regla que existe, podemos instalar eslint-config-prettier

```bash
npm install --save-dev eslint-config-prettier
```

```json
"extends": ["eslint:recommended", "eslint-config-prettier"]
```

### Validar que todos los files estén correctamente formateados

```json
"scripts": {
  "build": "babel src --out-dir dist",
  "lint": "eslint --ignore-path .gitignore",
  "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
  "format": "npm run prettier -- --write",
  "check-format": "npm run prettier -- --list-different",
  "validate": "npm run format && npm run lint"
}
```

## Husky

La descripción oficial de husky es algo así como:
Husky improves your commits and more 🐶 woof!

```
jajajja
```

Para que tengas más información acerca de esta asombrosa herramienta te dejo su <a href="https://github.com/typicode/husky"> documentación</a>

### Instalación

```bash
npm install husky --save-dev
npx husky install
npx husky-init
npm set-script prepare "husky install"
npx husky add .husky/pre-commit "npm run check-format"
npx husky add .husky/pre-commit "npm run validate"
```

## Commitlint

Para activar commits semánticos dentro de tu proyecto, no dudes en usar commitlint como herramienta. Si queres más información te dejo su [página oficial](https://github.com/conventional-changelog/commitlint)

### Instalación

asd

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

### Agregar husky a tus hooks

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### Crear commitlint.config.js

```javascript
// eslint-disable-next-line no-undef
module.exports = { extends: ['@commitlint/config-conventional'] }
```

## npm run all

Esta es una herramienta para correr multiples scripts en paralelo. Permite ahorrar tiempo en la ejecución de comandos.

```bash
npm i -D npm-run-all
```

Modificación del package.json

```javascript
"validate" : "npm-run-all --parallel check-format format lint"
```

## Jest

```bash
npm i -D jest
npm install -D jest-environment-jsdom
```

En nuestro package.json

```javascript
"test":"jest"
```

### Crear nuestros test file src/**tests**

```javascript
test('works', () => {})
```

Una vez hecho esto, se puede agregar al script de validate para que corra con husky:

```javascript
"validate" : "npm run lint && npm run test .."
```

### Modules con Babel en Jest

Hay que tener en cuenta que Jest corre en Node y Node de por si no soporta los imports statments.

Creamos un exampleFn.js

```javascript
export const greetingFn = () => {
  return 'hi'
}
```

Y creamos un exampleFn.test.js

```javascript
import { greetingFn } from '../exampleFn'
test('fn works', () => {
  const f = greetingFn()
  expect(f).toBe('hi')
})
```

Algo muy interesante que tiene jest es la simulación de un entorno browser dentro de los files de test (gracias a sus global objects) Para esto, debemos usar js-dom

<b>jest.config.js</b>

```javascript
module.exports = {
  testEnvironment: 'jest-environment-jsdom" // corra emulando al browser
}
```

Todos los parametros de configuración que querramos agregar podemos definirlos en el jest.config.js

```javascript
module.exports = {
  bail: 1,
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
}
```

Te dejo un link a la [documentacion](https://jestjs.io/docs/configuration) para que veas todo lo que podes agregar.

Finalmente, agregnado los tests a husky, el package.json debería quedar de la siguiente forma:

```json
  "scripts": {
    "test": "jest --config --coverage",
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore",
    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
    "format": "npm run prettier -- --write",
    "check-format": "npm run prettier -- --list-different",
    "validate": "npm run format && npm run lint && npm run test",
    "prepare": "husky install"
  },
```

PD: Para que no haya error de lintern a la hora de trabajar sobre los archivos .test.js, debemos definir en la configuración de eslint (env) -> jest:true

```javascript
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  }
```
