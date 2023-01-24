import { getPokemons } from '@/utils/pokemon'
import { NextApiRequest, NextApiResponse } from 'next'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pokemons = await getPokemons()
  return res.json(pokemons)
}
