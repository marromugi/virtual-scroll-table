import { POKEMON_TYPES_JP } from '../const/pokemon'

type PokemonLinkData = {
  name: string
  url: string
}

const ALL_POKEMON_LINK_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1154'
const POKEMON_LANGUAGE_JP = 'ja-Hrkt'

export const getPokemons = async () => {
  const res = await fetch(ALL_POKEMON_LINK_URL)
  const data = await res.json()

  const pokes = await Promise.all(
    data.results.map(async (pokeURL: PokemonLinkData) => {
      const r = await fetch(pokeURL.url)
      const pokeData = await r.json()

      // 日本語名取得
      const pokeSpeciesRes = await fetch(pokeData.species.url)
      const pokeSpecies = await pokeSpeciesRes.json()
      const pokeJpLang = pokeSpecies.names.find(
        (name: any) => name.language.name === POKEMON_LANGUAGE_JP
      )
      const pokeTypes = POKEMON_TYPES_JP.map((pokeType) => {
        const havingPokeTypes = pokeData.types.map((t: any) => t.type.name)
        //console.log(havingPokeTypes)
        return {
          ...pokeType,
          hasType: havingPokeTypes.some((t: any) => t === pokeType.name),
        }
      })

      return { ...pokeData, jpName: pokeJpLang.name, types: pokeTypes }
    })
  )
  return pokes
}
