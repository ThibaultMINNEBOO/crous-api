import config from "../config/config.json";
import { CrousApiError } from "../errors/CrousApiError";
import { version } from "../package.json";
import { Region } from "./Region";

export interface RestaurantData {
  album_url: string;
  closing: string;
  contact: string;
  crous_and_go_url: string;
  id: number;
  image_url: string;
  infos: string;
  lastSyncAt: string;
  lastUpdate: string;
  lat: number;
  lon: number;
  opening: string;
  originalImageUrl: string;
  regionId: number;
  sharing_short_url: string;
  sharing_url: string;
  short_desc: string;
  synchronized1: boolean;
  thumbnail_url: string;
  title: string;
  type: string;
  virtual_visit_url: string;
  xmlid: string;
  zone: string;
}

export class Restaurant {
  private constructor(
    private _albumUrl: string,
    private _closing: string,
    private _contact: string,
    private _crousAndGoUrl: string,
    private _id: number,
    private _imageUrl: string,
    private _infos: string,
    private _lastSyncAt: string,
    private _lastUpdate: string,
    private _lat: number,
    private _lon: number,
    private _opening: string,
    private _originalImageUrl: string,
    private _regionId: number,
    private _sharingShortUrl: string,
    private _sharingUrl: string,
    private _shortDesc: string,
    private _synchronized1: boolean,
    private _thumbnailUrl: string,
    private _title: string,
    private _type: string,
    private _virtualVisitUrl: string,
    private _xmlid: string,
    private _zone: string
  ) {}

  get albumUrl(): string {
    return this._albumUrl;
  }

  get closing(): string {
    return this._closing;
  }

  get contact(): string {
    return this._contact;
  }

  get crousAndGoUrl(): string {
    return this._crousAndGoUrl;
  }

  get id(): number {
    return this._id;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get infos(): string {
    return this._infos;
  }

  get lastSyncAt(): string {
    return this._lastSyncAt;
  }

  get lastUpdate(): string {
    return this._lastUpdate;
  }

  get lat(): number {
    return this._lat;
  }

  get lon(): number {
    return this._lon;
  }

  get opening(): string {
    return this._opening;
  }

  get originalImageUrl(): string {
    return this._originalImageUrl;
  }

  get regionId(): number {
    return this._regionId;
  }

  get sharingShortUrl(): string {
    return this._sharingShortUrl;
  }

  get sharingUrl(): string {
    return this._sharingUrl;
  }

  get shortDesc(): string {
    return this._shortDesc;
  }

  get synchronized1(): boolean {
    return this._synchronized1;
  }

  get thumbnailUrl(): string {
    return this._thumbnailUrl;
  }

  get title(): string {
    return this._title;
  }

  get type(): string {
    return this._type;
  }

  get virtualVisitUrl(): string {
    return this._virtualVisitUrl;
  }

  get xmlid(): string {
    return this._xmlid;
  }

  get zone(): string {
    return this._zone;
  }

  /**
   * Récupère la liste des restaurants de la région
   *
   * @param {number|Region} region L'identifiant de la région ou la région elle-même
   *
   * @throws {CrousApiError} Si une erreur survient lors de la récupération des restaurants
   * @returns {Promise<Restaurant[]>} La liste des restaurants de la région
   */
  static async findAll(region: number | Region): Promise<Restaurant[]> {
    const regionId = typeof region === "number" ? region : region.id;

    const response = await fetch(
      `${config.baseUrl}/regions/${regionId}/restaurants`,
      {
        headers: {
          "User-Agent": `CrousApi/${version} https://github.com/ThibaultMINNEBOO/crous-api`,
        },
      }
    );

    if (response.status !== 200) {
      throw new CrousApiError("Failed to fetch restaurants");
    }

    const restaurants: RestaurantData[] = await response.json();

    return restaurants.map(
      (restaurant: RestaurantData) =>
        new Restaurant(
          restaurant.album_url,
          restaurant.closing,
          restaurant.contact,
          restaurant.crous_and_go_url,
          restaurant.id,
          restaurant.image_url,
          restaurant.infos,
          restaurant.lastSyncAt,
          restaurant.lastUpdate,
          restaurant.lat,
          restaurant.lon,
          restaurant.opening,
          restaurant.originalImageUrl,
          restaurant.regionId,
          restaurant.sharing_short_url,
          restaurant.sharing_url,
          restaurant.short_desc,
          restaurant.synchronized1,
          restaurant.thumbnail_url,
          restaurant.title,
          restaurant.type,
          restaurant.virtual_visit_url,
          restaurant.xmlid,
          restaurant.zone
        )
    );
  }

  /**
   * Récupère un restaurant par son identifiant
   *
   * @param {number|Region} region L'identifiant de la région ou la région elle-même
   * @param restaurantId L'identifiant du restaurant
   *
   * @throws {CrousApiError} Si une erreur survient lors de la récupération du restaurant
   * @returns {Promise<Restaurant>} Le restaurant correspondant à l'identifiant
   */
  static async findById(
    region: number | Region,
    restaurantId: number
  ): Promise<Restaurant> {
    const regionId = typeof region === "number" ? region : region.id;

    const response = await fetch(
      `${config.baseUrl}/regions/${regionId}/restaurants`,
      {
        headers: {
          "User-Agent": `CrousApi/${version} https://github.com/ThibaultMINNEBOO/crous-api`,
        },
      }
    );

    if (response.status !== 200) {
      throw new CrousApiError("Failed to fetch restaurants");
    }

    const restaurants: RestaurantData[] = await response.json();

    const restaurant = restaurants.find(
      (restaurant: RestaurantData) => restaurant.id === restaurantId
    );

    if (!restaurant) {
      throw new CrousApiError(`Restaurant with id ${restaurantId} not found`);
    }

    return new Restaurant(
      restaurant.album_url,
      restaurant.closing,
      restaurant.contact,
      restaurant.crous_and_go_url,
      restaurant.id,
      restaurant.image_url,
      restaurant.infos,
      restaurant.lastSyncAt,
      restaurant.lastUpdate,
      restaurant.lat,
      restaurant.lon,
      restaurant.opening,
      restaurant.originalImageUrl,
      restaurant.regionId,
      restaurant.sharing_short_url,
      restaurant.sharing_url,
      restaurant.short_desc,
      restaurant.synchronized1,
      restaurant.thumbnail_url,
      restaurant.title,
      restaurant.type,
      restaurant.virtual_visit_url,
      restaurant.xmlid,
      restaurant.zone
    );
  }
}
