function NotFoundError(resource, id) {
  this.name = 'NotFoundError';
  this.message = `${resource}#${id} Not Found`;
  this.stack = (new Error()).stack;
}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = {
  NotFoundError,
};
