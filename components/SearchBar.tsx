import React from 'react'
import { TextInput } from 'react-native'

type Props = {
    setResults: (results: any[]) => void
    setSearchTerm: (text: string) => void
    searchTerm: string
}

const SearchBar = (props: Props) => {

    return (
        <TextInput className='rounded-lg bg-white border-2 w-full border-slate-200 shadow-md px-4 py-6' onChangeText={props.setSearchTerm} value={props.searchTerm} placeholder='Search for a movie' />
    )
}

export default SearchBar