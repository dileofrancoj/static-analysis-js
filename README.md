La idea de este README es seguir paso a paso el proceso para crear un proyecto desde 0 con las reglas de lintern y de code-fixing necesarios para garantizar el orden y el trabajo colaborativo.

# Lista de pasos para static analysis and testing javascript applications

## Creación del proyecto

```bash
npm init -y
```

## Instalación de dependencias básicas.

```bash
npm i @babel/cli @babel/core @babel/preset-env
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

ESLint es una herramienta de código abierto enfocada en el proceso de "lintig" para javascript (o más correctamente para ECMAScript). ESLint es la herramienta predominante para la tarea de "limpiar" código javascript tanto en el servidor (node.js) como en el navegador.

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
    "strict": ["error", "never"],
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
