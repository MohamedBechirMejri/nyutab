# nyutab

Upgrade your New Tab Page

![Screenshot](/.github/Assets/screenshot-2v0.8.png)

## About

I've used many new tab extensions, but none of them worked for me. So I decided to take the best features out of each one and put them here.

Many features are based on personal preferences (F1 Countdown, Dev Posts, Memes...).

I'll provide a way to pick the features you like in the future (if this extension gets noticed).

This an alpha build, most features might be changed/removed. The design will be overhauled once all the features are implemented.

So please offer your feedback (file bugs, suggest improvements, new features...) on the [issues page](https://github.com/mohamedbechirmejri/nyutab/issues).

## Features

- [x] Quick Links
- [x] Hacker News
- [x] Popular Posts on r/javascript
- [x] F1 Next Race Countdown
- [x] Memes
- [x] Facts and Quotes
- [x] Weather
- [x] Clock and Date
- [ ] Tools
  - [x] Prayer Times
  - [x] Breathing Exercice
  - [~] Calculator
  - [x] Todo List
  - [ ] Links To Popular Tools
  - [ ] Save Tabs for Later
  - [~] Awesome Lists
  - [ ] ????
- [ ] Games
  - [ ] Soon..
- [x] Settings
- [x] Image Backgrounds

## Help Me Improve

- If you like this extension or see it's potential then please help me by starring and sharing it with everyone you know (and don't know xD).

- Most importantly visit the issues tab and fill it with everything that comes to your mind.

- You can also help by submitting pull requests (improve docs, fix issues...)

## Compatibility

Should Support all browsers but I have only tested Chrome Dev on Windows 11. I'll test other browsers once v1 comes out.

## Releases

None Yet, I have to finish some basic features before releasing this on stores. you can build it on your own using the steps below.

### How to build

- clone this repo

- install dependencies

```bash
yarn
```

- start server

```bash
yarn start
```

- make IMPORTANT changes:

  - create .env file in root folder
  - add [WeatherAPI](https://weatherapi.com) key

  ```bash
  REACT_APP_WEATHER_API_KEY='[API_KEY_HERE]'
  ```

- build extension

```bash
yarn build
```

- enable dev mode in your browser
- drag build folder to your extensions page
