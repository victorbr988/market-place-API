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

  filterByCategoryType(column, category_type) {
    console.log(category_type)
    if (category_type) {
      this.query = this.query.where(column, category_type);
    }
    
    return this;
  }

  filterByRole(column, userRole) {
    if (userRole > 0) {
      this.query = this.query.where(column, userRole);
    }
    
    return this;
  }

  filterByCondo(column, condo_id) {
    if (condo_id.length > 0) {
      this.query = this.query.where(column, condo_id);
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
