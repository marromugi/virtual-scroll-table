import styled from 'styled-components'

import { BiCheck, BiMinus } from 'react-icons/bi'
import { Box } from './box'

const CheckBoxInput = styled.input`
  display: none;
`

const CheckBoxWrapper = styled.div<{
  isChecked: boolean
  isPartialChecked: boolean
}>`
  padding: 6px;
  transition: 0.4s;
  cursor: pointer;
  & label {
    background-color: ${({ isChecked, isPartialChecked }) =>
      isChecked || isPartialChecked ? '#30b156ed' : 'lightgray'};
  }

  &:hover {
    & label {
      background-color: #30b15678;
    }
  }
`

const CheckBoxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-contents: center;
  width: fit-content;
  height: fit-content;
  border-radius: 6px;
  padding: 4px;
  transition: 0.4s;
  cursor: pointer;
`

export const CheckBox = ({
  id,
  isChecked,
  isPartialChecked,
  onChange,
}: {
  id: string
  isChecked: boolean
  isPartialChecked?: boolean
  onChange: () => void
}) => {
  return (
    <Box>
      <CheckBoxInput type="checkbox" defaultChecked={isChecked} id={id} />
      <CheckBoxWrapper
        isChecked={isChecked}
        isPartialChecked={isPartialChecked ?? false}
        onClick={() => onChange()}
      >
        <CheckBoxContainer htmlFor={id}>
          {isChecked && <BiCheck color={'#FFFFFF'} fontWeight={'bold'} />}
          {!isChecked && isPartialChecked && (
            <BiMinus color={'#FFFFFF'} fontWeight={600} />
          )}
          {!isChecked && !isPartialChecked && (
            <Box width={'16px'} height={'16px'} />
          )}
        </CheckBoxContainer>
      </CheckBoxWrapper>
    </Box>
  )
}
