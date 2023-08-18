// For Supabase url, key and schema, they are specified in app.json

type Importance = {
  key: number
  flavourText: string
  minSize: number
  maxSize: number
}

export const bubbleImportances: {[key: string]: Importance} = {
  1: {key: 1, flavourText: "Ignorable", minSize: 0, maxSize: 10},
  2: {key: 2, flavourText: "Low", minSize: 10, maxSize: 20},
  3: {key: 3, flavourText: "Average", minSize: 20, maxSize: 30},
  4: {key: 4, flavourText: "High", minSize: 30, maxSize: 40},
  5: {key: 5, flavourText: "Super", minSize: 40, maxSize: 50},
}
