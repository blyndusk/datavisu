# Unknown genius (gr8)

<p>
    <a href="https://github.com/blyndusk/unknown-genius/blob/master/package.json"><img src="https://img.shields.io/requires/github/blyndusk/unknown-genius.svg" alt="dependencies"/></a>
    <a href="https://github.com/blyndusk/unknown-genius/releases/latest"><img src="https://img.shields.io/github/release-pre/blyndusk/unknown-genius.svg" alt="release"/></a>
    <a href="https://github.com/blyndusk/unknown-genius/commits/master"><img src="https://img.shields.io/github/commits-since/blyndusk/unknown-genius/0.13.0.svg" alt="commits since last release"/></a>
    <a href="https://github.com/blyndusk/unknown-genius/blob/master/LICENSE"><img src="https://img.shields.io/github/license/blyndusk/unknown-genius.svg" alt="license"/></a>
    <img src="https://img.shields.io/github/languages/top/blyndusk/unknown-genius.svg" alt="top languages"/>
</p>

> 🏆 a data visualization, highlighting the winners of the Nobel Prizes, using @reactjs.

## Team

- [Yasmine Adrad](https://github.com/YasmineAD)
- [Maxime Charpentier](https://github.com/maximecharpentier)
- [Amaury Faveriel](https://github.com/AmauryFaveriel)
- [Alexandre Delaloy](https://github.com/blyndusk)

> **Choix fonctionnels**, structure de **base de données** et **données brutes**: [unknown-genius/docs](https://github.com/blyndusk/unknown-genius/tree/master/docs)

## I - Front

> **Repository**: [unknown-genius](https://github.com/blyndusk/unknown-genius)

### 1. Install

```bash
git clone git@github.com:blyndusk/unknown-genius.git
cd unknown-genius
yarn || npm
```

### 2. Start

```bash
yarn start || npm run start
```

## II - Back

> **Repository**: [backend-unknowngenius](https://github.com/AmauryFaveriel/backend-unknowngenius)

### 1. Install

```bash
git clone git@github.com:AmauryFaveriel/backend-unknowngenius.git
cd backend-unknowngenius
cp .env.exemple .env
```

- start mysql
- change .env with logins
- `composer update`
- `bin/console cache:clear`
- `bin/console doctrine:database:create`
- `bin/console make:migration`
- `bin/console doctrine:migration:migrate`

### 2. Start

- `bin/console server:run`
- open 774d8b0b.ngrok.io/api to get JSONS

## License

Under [MIT](https://github.com/blyndusk/unknown-genius/blob/master/LICENSE) license.
