import config from "../config/config.json";
import { CrousApiError } from "../errors/CrousApiError";
import { version } from "../package.json";

export interface RegionData {
  id: number;
  code: string;
  name: string;
}

export class Region {
  private constructor(
    private _id: number,
    private _code: string,
    private _name: string
  ) {}

  get id(): number {
    return this._id;
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  /**
   * Récupère la liste des régions disponibles
   *
   * @throws {CrousApiError} Si une erreur survient lors de la récupération des régions
   * @returns {Promise<Region[]>} La liste des régions disponibles sous forme de promesse
   */
  static async findAll(): Promise<Region[]> {
    const response = await fetch(`${config.baseUrl}/regions`, {
      headers: {
        "User-Agent": `CrousApi/${version} https://github.com/ThibaultMINNEBOO/crous-api`,
      },
    });
    if (response.status !== 200) {
      throw new CrousApiError("Failed to fetch regions");
    }

    const regions: RegionData[] = await response.json();

    return regions.map(
      (region: RegionData) => new Region(region.id, region.code, region.name)
    );
  }

  /**
   * Récupère une région par son identifiant
   *
   * @param {number} id L'identifiant de la région à récupérer
   *
   * @throws {CrousApiError} Si une erreur survient lors de la récupération de la région
   * @returns {Promise<Region>} La région correspondant à l'identifiant
   */
  static async findById(id: number): Promise<Region> {
    const response = await fetch(`${config.baseUrl}/regions`, {
      headers: {
        "User-Agent": `CrousApi/${version} https://github.com/ThibaultMINNEBOO/crous-api`,
      },
    });
    if (response.status !== 200) {
      throw new CrousApiError(`Failed to fetch regions`);
    }

    const regions: RegionData[] = await response.json();

    const regionData = regions.find((region) => region.id === id);

    if (!regionData) {
      throw new CrousApiError(`Region with id ${id} not found`);
    }

    return new Region(regionData.id, regionData.code, regionData.name);
  }
}
