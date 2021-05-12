function generateYearList(distanceYear) {
  const max = new Date().getFullYear();
  const min = max - distanceYear;
  const years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}

export default generateYearList;
