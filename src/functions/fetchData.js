async function fetchData() {
  var data = [];
  try {
    data = await fetch("https://api.jsonbin.io/b/613b31a19548541c29af5f98");
  } catch (e) {
    console.error("API DATA FETCH ERROR", e);
  }
  return data;
}

export default fetchData;
