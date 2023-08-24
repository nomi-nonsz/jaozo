# Jaozo

![Jaozo](./src/assets/icons/jwt.svg)

Jaozo is the anime streaming-like for fun. Jaozo is actually not made for watch anime but only showing lists of anime.

Anime database from [MyAnimeList](https://myanimelist.net/) with special search API from [Jikan API](https://jikan.moe/). Initial purpose of making this website is for a self-taught front-end marathon project. This project was made with React + Vite and TailwindCSS.

![Wewew](./src/assets/images/wewew.gif)

The deployment has been stopped until commit 7493a7585f5424b1b9feb8ccf394672994f9dfe3 on the main branch.

### Usage
this project uses yarn for the script package so it affects the guide, maybe you are familiar with yarn even if you use npm or pnpm

1. Just clone this repository and then

    ```bash
    git clone https://github.com/norman-andrians/jaozo.git && cd jaozo
    ```
2. install dependencies

    ```bash
    yarn
    ```
3. run project
    ```bash
    yarn dev
    ```
4. build css (run on another terminal)
    ```bash
    yarn twatch
    ```

### Build
if you want to build this project use the following command

```bash
yarn build
```

### Additional scripts

- ### twatch
    
    TailwindCSS tool that scan template files for classes and build CSS. it run `tailwindcss -i ./src/input.css -o ./src/App.css --watch`

    ```
    yarn twatch
    ```

# Contribution

To our potential contributions. We haven't determined the terms and conditions for contributing, but for now you can only suggest anime lists based on the id in the [custom-anime](./src/assets/data/custom-anime/) directory.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
