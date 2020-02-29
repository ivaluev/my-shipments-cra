import React, { useState } from 'react'
import { Search } from 'emotion-icons/fa-solid'
import { Close } from 'emotion-icons/ion-md'
import { desaturate } from 'polished'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import styled from '../../utils/styled'
import brandColors from '../../styles/colors/brandColors'

const _search = 'search'
const _page = 'page'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setSearchState = (fn: () => void) => fn()
const setSearchStateDebounced = AwesomeDebouncePromise(setSearchState, 1200)

const colorInactive = desaturate(0.7, brandColors.red)
const colorActive = brandColors.red

type ShipmentIndexSearchProps = {
  query: URLSearchParams
  setUrl: () => void
}

export const ShipmentIndexSearch = ({ query, setUrl }: ShipmentIndexSearchProps) => {
  const search = query.get(_search) || ''

  const [searchLocal, setSearchLocal] = useState(search)
  const [searchIsActive, setSearchIsActive] = useState(false)

  const setSearch = (newSearch: string) => {
    query.set(_search, newSearch)
    query.set(_page, '1')
    setUrl()
  }

  const resetSearch = () => {
    query.delete(_search)
    query.set(_page, '1')
    setUrl()
  }

  const onChange = (value: string) => {
    setSearchLocal(value)
    // we are quit until get 3 letters from user
    if (value && value.length > 1) {
      setSearchStateDebounced(() => setSearch(value))
    }
    if (!value) {
      setSearch('')
    }
  }
  const clearSearch = () => {
    setSearchLocal('')
    resetSearch()
  }

  return (
    <SearchContainer style={{ backgroundColor: searchIsActive ? '#e5e5e3' : '' }}>
      <SearchIcon color={searchIsActive ? colorActive : colorInactive} />
      <SearchInput
        type="text"
        placeholder="Search shipment by id...  (not less than 2 characters)"
        value={searchLocal || ''}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setSearchIsActive(true)}
        onBlur={() => setSearchIsActive(false)}
      />
      <IconClose onClick={clearSearch} style={{ visibility: searchLocal && searchLocal.length ? '' : 'hidden' }} />
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  /* background-color: whitesmoke; */
`

const SearchIcon = styled(Search)`
  width: 65px;
  height: 25px;
`

const IconClose = styled(Close)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  width: 100%;
  height: 48px;
  padding-left: 5px;
  background-color: transparent;
  &:focus {
    outline-width: 0;
  }
`
