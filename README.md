# Crous API Wrapper

## Description

Crous API est un wrapper à l'API du Crous.

## Examples

```ts
import { Restaurant, Menu, Region } from "crous-api";

// Get all regions
const regions = await Region.findAll();

// Get a region by specific id
const region = await Region.findById(1);

// Get restaurants of a region
const restaurants = await Restaurant.findAll(1); // Or see Restaurant.findAll(region);

// Get a restaurant by a specific id
const restaurant = await Restaurant.findById(1, 1); // Or see : await Restaurant.findById(region, 1);

// Get all menus of a specific restaurant
const menus = await Menu.findAll(1, 1); // Or see : await Menu.findAll(region, restaurant);

// Get a menu on a specific day
const menu = await Menu.findByDate(1, 1, "2024-10-18"); // Or see : await Menu.findByDate(region, restaurant, new Date()); (When i wrote this, it was the 18th October 2024)
```
