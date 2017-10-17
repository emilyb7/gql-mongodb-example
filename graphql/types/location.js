const round = (value, decimals) =>
  Number(Math.round(value + "e" + decimals) + "e-" + decimals);

module.exports = class Location {
  constructor(loc) {
    this.id = loc.id;
    this.name = loc.name;
    this.description = loc.description;
    this.coordinates = loc.loc.coordinates;
    this.rating = loc.rating;
    this.distance = round(loc.distance / 1000, 1);
  }
};
