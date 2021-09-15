export function getValueObjectArray(data) {
  const valueArray = [];
  data.forEach((x) => {
    const newDate = new Date(x.date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDay();
    const date = `${year}-${month}-${day}`;
    const obj = { date, count: x.pnl };
    valueArray.push(obj);
  });
  return valueArray;
}

export function getStartAndEndDate(data) {
  if (data.length) {
    const startDate = data[0].date;
    const endDate = data[data.length - 1].date;
    return { startDate, endDate };
  }
  return;
}
