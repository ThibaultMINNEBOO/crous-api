import config from "../config/config.json";
import { CrousApiError } from "../errors/CrousApiError";
import { version } from "../package.json";
import { Region } from "./Region";
import { Restaurant } from "./Restaurant";

export interface Dish {
  name: string;
}

export interface FoodCategory {
  name: string;
  dishes: Dish[];
}

export interface Meal {
  name: string;
  foodcategory: FoodCategory[];
}

export interface MenuData {
  id: number;
  restaurant_id: number;
  date: string;
  meal: Meal[];
}

export class Menu {
  private constructor(
    private _id: number,
    private _restaurantId: number,
    private _date: string,
    private _meal: Meal[]
  ) {}

  get id(): number {
    return this._id;
  }

  get restaurantId(): number {
    return this._restaurantId;
  }

  get date(): string {
    return this._date;
  }

  get meal(): Meal[] {
    return this._meal;
  }

  /**
   * Récupère la liste des menus d'un restaurant
   *
   * @param {number|Region} region L'identifiant de la région ou la région elle-même
   * @param {number|Restaurant} restaurant L'identifiant du restaurant ou le restaurant lui-même
   *
   * @throws {CrousApiError} Si une erreur survient lors de la récupération des menus
   * @returns {Promise<Menu[]>} La liste des menus du restaurant
   */
  static async findAll(
    region: number | Region,
    restaurant: number | Restaurant
  ): Promise<Menu[]> {
    const regionId = typeof region === "number" ? region : region.id;
    const restaurantId =
      typeof restaurant === "number" ? restaurant : restaurant.id;

    const response = await fetch(
      `${config.baseUrl}/regions/${regionId}/restaurants/${restaurantId}/menus`,
      {
        headers: {
          "User-Agent": `CrousApi/${version} https://github.com/ThibaultMINNEBOO/crous-api`,
        },
      }
    );

    if (response.status !== 200) {
      throw new CrousApiError("Failed to fetch menus");
    }

    const menus: MenuData[] = await response.json();

    return menus.map(
      (menu: MenuData) =>
        new Menu(menu.id, menu.restaurant_id, menu.date, menu.meal)
    );
  }

  /**
   * Récupère un menu par sa date
   *
   * @param {number|Region} region L'identifiant de la région ou la région elle-même
   * @param {number|Restaurant} restaurant L'identifiant du restaurant ou le restaurant lui-même
   * @param date La date du menu (sous format ISO 8601) ou un objet Date
   *
   * @throws {CrousApiError} Si une erreur survient lors de la récupération du menu
   * @returns {Promise<Menu>} Le menu correspondant à la date
   */
  static async findByDate(
    region: number | Region,
    restaurant: number | Restaurant,
    date: string | Date
  ) {
    const regionId = typeof region === "number" ? region : region.id;
    const restaurantId =
      typeof restaurant === "number" ? restaurant : restaurant.id;

    const dateStr =
      typeof date === "string" ? date : date.toISOString().split("T")[0];

    // Check if the date is in the format "YYYY-MM-DD"
    if (!dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      throw new CrousApiError("Invalid date format");
    }

    const response = await fetch(
      `${config.baseUrl}/regions/${regionId}/restaurants/${restaurantId}/menus`,
      {
        headers: {
          "User-Agent": `CrousApi/${version} https://github.com/ThibaultMINNEBOO/crous-api`,
        },
      }
    );

    if (response.status !== 200) {
      throw new CrousApiError("Failed to fetch menus");
    }

    const menus: MenuData[] = await response.json();

    const menu = menus.find((menu: MenuData) => menu.date === dateStr);

    if (!menu) {
      throw new CrousApiError(`Menu for date ${dateStr} not found`);
    }

    return new Menu(menu.id, menu.restaurant_id, menu.date, menu.meal);
  }
}
