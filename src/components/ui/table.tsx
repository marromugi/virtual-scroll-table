import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 600px;
  height: 400px;
  border-radius: 6px;
  overflow: scroll;
`

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0px;
  table-layout: auto;
`

export const TableHeader = styled.thead``

export const TableHeaderRow = styled.tr`
  background-color: rgb(249 250 251 / 1);
`

export const TableHeaderCell = styled.th`
  z-index: 10;
  vertical-align: top;
  position: sticky;
  top: 0px;
  background-color: rgb(229 231 235 / 1);
  padding: 4px 8px;
`

export const TableHeaderCornerCell = styled(TableHeaderCell)`
  z-index: 30;
  left: 0px;
`

export const TableBody = styled.tbody``

export const TableRow = styled.tr`
  height: 48px;
  background-color: rgb(249 250 251 / 1);
`

export const TableCell = styled.td`
  text-align: left;
  font-size: 1rem /* 16px */;
  line-height: 1.5rem /* 24px */;
  border-color: rgb(229 231 235 / 1);
  border-bottom-width: 1px;
  padding: 4px 8px;
`

export const TableLeftCell = styled(TableCell)`
  position: sticky;
  z-index: 20;
  left: 0;
  background-color: #f7f7f7;
`
