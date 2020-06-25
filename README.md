# Marvel Catalog

<img src="https://github.com/lucas-rombaldi/marvel-catalog/blob/master/src/img/marvel-logo.png?raw=true" height="200" width="400"/>

This is a catalog application made for all Marvel fans, made in React with Redux, this app brings to you all of the Marvel characters, along with many nice information, like series, comics, among others! Enjoy and contribute!

![CI-CD](https://github.com/lucas-rombaldi/marvel-catalog/workflows/CI-CD/badge.svg)

## Release Notes

### 1.1.0
- [Reactour](https://reactour.js.org/) implementation through a High Order Component (TourHOC).

### 1.0.0
This is the first version of the catalog, bringing the following features:
- Characters list (with search and infinite scroll for a better UX - just like Facebook)
- Character details (just clicking on his card)
- Character edition

See a "quick" overview of this first version...

<img src="https://github.com/lucas-rombaldi/marvel-catalog/blob/master/docs/videos/v1.0.0/marvel-catalog.gif" alt="animated"/>

### Next Versions
As every first version, it has many mapped features, like:
- "Data Provided by Marvel" footer.
- Automated testing.
- Add more informations on character details page, like comics.
- Add more editable fields/lists on characters edition dialog.
- Improve components reuse (like segregating the CharacterDialog in a Dialog, a FormDialog and the own CharacterDialog consuming them).
- Apply best Redux practices, segregating the reducers by features.
- Apply better CSS practices, even that a little of BEM has been applied already.
- Apply better UX practices, improving the application use.

## Get Started

### API Configuration
Considering that all information brought to you by this catalog is provided by Marvel, you must configure the keys registered for your user to get started. Even that this is not a production app, it wouldn't be nice for all of us to share the same keys (there is rate limit). So, I suggest that you register yourself in the [Marvel API](https://developer.marvel.com/account) to get your own public and private keys. With them, just overwrite the file `./src/config/config.js`.

``` 
export const marvelApi = {
    publicKey: '{publicKey}',
    privateKey: '{privateKey}',
    baseUrl: 'https://gateway.marvel.com:443',
  }
```

### App Start

Considering that you do have [Yarn](https://yarnpkg.com/) installed, just run the following commands in the base folder of this repo:

```
yarn install
yarn start
```

And that's all! 