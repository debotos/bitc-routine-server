// Filter Semester by text
export const FilterSemester = (ItemsArray, { text }) => {
  if (!ItemsArray) {
    ItemsArray = [];
  }
  // console.log('Filter Data => ', ItemsArray);
  // console.log('Filter Text =>', text);

  return ItemsArray.filter(singleItem => {
    const textMatch = singleItem.name.includes(text);

    return textMatch;
    //eslint-disable-next-line
  });
};
