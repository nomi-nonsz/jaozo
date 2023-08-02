# Jaozo

![Jaozo](./src/assets/icons/jwt.svg)

Jaozo is the anime streaming-like for fun. Jaozo is actually not made for watch anime but only showing lists of anime.

Anime database from [MyAnimeList](https://myanimelist.net/) with special search API from [Jikan API](https://jikan.moe/). Initial purpose of making this website is for a self-taught front-end marathon project. This project was made with React + Vite and TailwindCSS.

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

### Additional scripts

- ### twatch
    
    TailwindCSS tool that scan template files for classes and build CSS. it run `tailwindcss -i ./src/input.css -o ./src/App.css --watch`

    ```
    yarn twatch
    ```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
