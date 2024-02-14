class FilterDecorator {
  constructor(query) {
    this.query = query();
  }

  filterByTab(column, tab) {
    this.query = this.query.where(column, tab);
    return this;
  }

  filterByName(column, search) {
    if (search.length > 0) {
      this.query = this.query.where(column, 'ilike', `%${search}%`);
    }
    return this;
  }

  filterByCategory(column, category) {
    if (category.length > 0) {
      this.query = this.query.where(column, category);
    }
    
    return this;
  }

  queryResult() {
    return this.query;
  }
}

module.exports = {
  FilterDecorator
}
