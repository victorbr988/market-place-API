function aggregateByCategory(items) {
  const hasItems = items.length > 0
  const itemsAggregate = {}
  const categories = []

  hasItems && items.map((item) => {
    if (!itemsAggregate[item.categoryNameClean]) {
      itemsAggregate[item.categoryNameClean] = [
        { 
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          situation: item.situation,
          images: item.images,
          category: item.categoryName
        }
      ]
    }
    if (!categories.some((category) => category.name === item.categoryName)) {
      categories.push({
        name: item.categoryName,
        name_clean: item.categoryNameClean
      })
    }
    else {
      itemsAggregate[item.categoryNameClean].push({ 
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        situation: item.situation,
        images: item.images,
        category: item.categoryName
      })
    }
  })

  const itemsCollection = {
    categories,
    values: itemsAggregate
  }
  return hasItems ? itemsCollection : items
}

module.exports = {
  aggregateByCategory
}