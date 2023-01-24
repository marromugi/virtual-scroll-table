import styled from 'styled-components'

export const Box = styled.div<{
  width?: string
  height?: string
  padding?: string
}>`
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ padding }) => padding && `padding: ${padding}`};
`

export const FlexBox = styled(Box)<{
  direction?: 'row' | 'column',
  gap?: number
  justifyContent?: string
  alignItems?: string
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ?? 'row')};
  align-items: ${({ alignItems }) => (alignItems ? `${alignItems}` : 'center')};
  ${({ gap }) => gap && `gap: ${gap}px`};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};
`

export const CircleBox = styled.div<{ size: number; color: string }>`
  border-radius: 1000vw;
  padding: 4px;
  ${({ size }) => `width: ${size}px`};
  ${({ size }) => `height: ${size}px`};
  ${({ color }) => `background-color: #${color}`};
`

export const CursorBox = styled(Box)`
  cursor: pointer;
  transition: 0.3s;
`
