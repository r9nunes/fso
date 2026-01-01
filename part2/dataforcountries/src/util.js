function flat(a) {
  if (Array.isArray(a))
    return a.join(', ')
  return a
}

function buildCountryObject(data) {
  const country = {
    name: data[0].name.common,
    official: data[0].name.official,
    capital: data[0].capital[0],
    area: data[0].area,
    flag: data[0].flags.png,
    latlng: data[0].latlng,
    location: data[0].latlng,
  }
  return country
}

export default { flat, buildCountryObject }