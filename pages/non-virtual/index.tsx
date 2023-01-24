import { CheckBox } from '@/components/ui/input'
import { Box, CircleBox, FlexBox } from '@/components/ui/box'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableHeaderCornerCell,
  TableHeaderRow,
  TableLeftCell,
  TableRow,
} from '@/components/ui/table'
import { SemiboldText, Title } from '@/components/ui/text'
import { POKEMON_TYPES_JP } from '@/const/pokemon'
import { useEffect, useState } from 'react'
import { getPokemons } from '@/utils/pokemon'
import { usePokemon } from '@/hooks/usePokemon'

export const Page = () => {
  const pokemonTypes = POKEMON_TYPES_JP
  const defaultPokemons = usePokemon()
  const [pokemons, setPokemons] = useState(defaultPokemons)

  const isPokemonHasType = (pokemon: any, typeName: string) => {
    return pokemon.types.find((t: any) => t.name === typeName).hasType
  }

  const handlePokemonTypeChange = (pokemon: any, pokeType: any) => {
    const updatedPokemons = pokemons.map((p) => {
      if (pokemon.id !== p.id) {
        return p
      }

      const newPokemonTypes = pokemon.types.map((t: any) => {
        const isTargetType = t.name === pokeType.name
        return isTargetType ? { ...t, hasType: !t.hasType } : t
      })
      return { ...p, types: newPokemonTypes }
    })
    setPokemons(updatedPokemons)
  }

  useEffect(() => {
    setPokemons(defaultPokemons)
  }, [defaultPokemons])

  return (
    <FlexBox
      width={'100vw'}
      height={'100vh'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Title>ポケタイプ</Title>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCornerCell>
                <SemiboldText>ポケタイプ</SemiboldText>
              </TableHeaderCornerCell>
              {pokemonTypes.map((pokeType) => (
                <TableHeaderCell key={pokeType.name}>
                  <FlexBox width={'80px'} justifyContent={'center'}>
                    <SemiboldText>{pokeType.jp}</SemiboldText>
                  </FlexBox>
                </TableHeaderCell>
              ))}
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {pokemons.map((pokemon) => (
              <TableRow key={pokemon.id}>
                <TableLeftCell>
                  <FlexBox
                    width={'100%'}
                    height={'100%'}
                    justifyContent="center"
                    gap={16}
                  >
                    <CircleBox size={40} color={'f0f0f0'}>
                      {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          width={40}
                          src={pokemon.sprites.front_default}
                          alt={pokemon.species.name}
                        />
                      }
                    </CircleBox>
                    <Box width={'100px'}>
                      <SemiboldText>{pokemon.jpName}</SemiboldText>
                    </Box>
                  </FlexBox>
                </TableLeftCell>
                {pokemonTypes.map((pokeType) => (
                  <TableCell key={`${pokemon.id}-${pokeType.name}`}>
                    <FlexBox
                      width={'100%'}
                      height={'100%'}
                      justifyContent="center"
                      gap={16}
                    >
                      <CheckBox
                        id={''}
                        isChecked={isPokemonHasType(pokemon, pokeType.name)}
                        isPartialChecked={false}
                        onChange={() => {
                          handlePokemonTypeChange(pokemon, pokeType)
                        }}
                      />
                    </FlexBox>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FlexBox>
  )
}

export default Page
