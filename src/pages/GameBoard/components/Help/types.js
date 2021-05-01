export const HEATMAP_FULL = 13;
export const HEATMAP_ZONE_QUARTER = 23;
export const _7X7_HELP = 230;

const defaultMapClass = 'redstone';
const defaultMapSize = 'size-70';


const getZone = (rangeAlpha, digitRange, type = 'circle', color = defaultMapClass, size = defaultMapSize) =>
{
  let mapStones = {}
  let classNamesMapStones = {}
  let alpha = rangeAlpha.toUpperCase().split('')
  let digits = digitRange.split(',')

  alpha.map((char) => {
    digits.map((digit) => {
      mapStones[`${char}${digit}`] = type
      classNamesMapStones[`${char}${digit}`] = `${size} ${color}`
    })
  })

  return {mapStones, classNamesMapStones};
}
export const MAP_QUARTERS = {
  '1': getZone('GHJKLMN', '7,8,9,10,11,12,13'),
  '2': getZone('ABCDEFG', '7,8,9,10,11,12,13'),
  '3': getZone('ABCDEFG', '1,2,3,4,5,6,7'),
  '4': getZone('GHJKLMN', '1,2,3,4,5,6,7'),
}

export const MAP_HALF = {
  '1': getZone('ABCDEFGGHJKLMN', '7,8,9,10,11,12,13'),
  '2': getZone('ABCDEFGGHJKLMN', '1,2,3,4,5,6,7'),
}