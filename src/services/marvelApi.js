import CryptoJS from "crypto-js";
import moment from "moment";
import { marvelApi as config } from "../config/config";

export default class MarvelApi {
  static counter = 1;

  static getCharacters(origOptions = {}) {
    const defaultOptions = { page: 0, count: 20, nameStartsWith: "" };
    const options = Object.assign(defaultOptions, origOptions);

    const URI = "/v1/public/characters";
    const currentOffset =
      options.page === 1 ? 0 : options.count * (options.page - 1);

    let params = `${this.getBaseParams()}&limit=${
      options.count
    }&offset=${currentOffset}`;

    if (options.nameStartsWith) {
      params = params.concat(`&nameStartsWith=${options.nameStartsWith}`);
    }
    const url = `${config.baseUrl}${URI}${params}`;

    return fetch(url);
  }

  static fetchStoriesByCharacter(characterId, page) {
    const count = 10;
    const currentOffset = page === 1 ? 0 : count * (page - 1);

    const URI = `/v1/public/characters/${characterId}/series`;
    const params = `${this.getBaseParams()}&limit=${count}&offset=${currentOffset}`;
    const url = `${config.baseUrl}${URI}${params}`;
    console.log("url", url);
    return fetch(url);
  }

  static getCharacterById(id) {
    const URI = `/v1/public/characters/${id}`;
    const url = `${config.baseUrl}${URI}${this.getBaseParams()}`;
    return fetch(url);
  }

  static getBaseParams() {
    const timeStamp = moment().unix();
    const hash = CryptoJS.MD5(
      timeStamp + config.privateKey + config.publicKey
    ).toString(CryptoJS.enc.Hex);

    return `?apikey=${config.publicKey}&ts=${timeStamp}&hash=${hash}`;
  }
}
