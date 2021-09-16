export default function getStartAndEndDate(data) {
  if (data?.length) {
    const startDate = data[0]?.date;
    const endDate = data[data.length - 1]?.date;
    return { startDate, endDate };
  }
  return;
}
