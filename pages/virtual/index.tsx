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
import { useMemo, useRef, useState } from 'react'
import { TABLE_ROW_HEIGHT_PX } from '@/const/element'
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import { getPokemons } from '@/utils/pokemon'

export const Page = ({ defaultPokemons }: { defaultPokemons: any[] }) => {
  const pokemonTypes = POKEMON_TYPES_JP
  const [pokemons, setPokemons] = useState(defaultPokemons)
  const containerRef = useRef<HTMLDivElement>(null)

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

  const { getVirtualItems, getTotalSize } = useVirtualizer({
    count: pokemons.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => TABLE_ROW_HEIGHT_PX,
  })

  const virtualRows = getVirtualItems()

  /**
  仮想スクロール用の高さを確保するため、
  現在のスクロール位置を基に表示範囲外の上スペースを取得
  */
  const spaceTop = useMemo(
    () => (virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0),
    [virtualRows]
  )

  /**
  仮想スクロール用の高さを確保するため、
  現在のスクロール位置を基に表示範囲外の下スペースを取得
  */
  const spaceBottom = useMemo(
    () =>
      virtualRows.length > 0
        ? getTotalSize() - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0,
    [getTotalSize, virtualRows]
  )

  /**
  表示範囲外の上スペース用のエレメント
  */
  const spaceTopElement = useMemo(
    () => spaceTop > 0 && <tr style={{ height: `${spaceTop}px` }} />,
    [spaceTop]
  )

  /**
  表示範囲外の下スペース用のエレメント
  */
  const spaceBottomElement = useMemo(
    () => spaceBottom > 0 && <tr style={{ height: `${spaceBottom}px` }} />,
    [spaceBottom]
  )

  const rowElm = (virtualRow: VirtualItem) => {
    const pokemon = pokemons[virtualRow.index]
    if (pokemon === undefined) {
      return <></>
    }
    return (
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
    )
  }

  return (
    <FlexBox
      width={'100vw'}
      height={'100vh'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Title>ポケタイプ</Title>
      <TableContainer ref={containerRef}>
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
            {spaceTopElement}
            {virtualRows.map((virtualRow) => rowElm(virtualRow))}
            {spaceBottomElement}
          </TableBody>
        </Table>
      </TableContainer>
    </FlexBox>
  )
}

export const getStaticProps = async () => {
  const defaultPokemons = await getPokemons()
  return {
    props: {
      defaultPokemons,
    },
  }
}

export default Page
