module.exports = class Location {
  constructor(loc) {
    this.id = loc.id;
    this.name = loc.name;
    this.description = loc.description;
    this.coordinates = loc.coordinates;
  }
};
