export class Pageable {
  constructor(page, size) {
    this.page = page;
    this.size = size;
  }

  get limit() {
    return this.size;
  }

  get offset() {
    if (this.page === 1) {
      return 0;
    } else {
        return this.size * (this.page - 1);
    }
  }
}
