import { View, Text, Alert, FlatList } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'
import { searchMovies } from '@/queries'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'

type Props = {}

const SearchTitle = (props: Props) => {
    const [loadingResults, setLoadingResults] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [results, setResults] = useState<SearchTitle[]>([])

    useEffect(() => {
        if (searchTerm.length > 2) {
            setLoadingResults(true)
            const debouncedSearch = setTimeout(() => {
                searchMovies(searchTerm).then(data => {
                    if (data && data.titleResults) {
                        setResults(data.titleResults.results)
                    }
                }).catch(error => console.log('error', error)).finally(() => setLoadingResults(false))

            }, 1000)
            return () => clearTimeout(debouncedSearch)
        }
        else {
            setResults([])
            setLoadingResults(false)
        }

    }, [searchTerm])
    return (
        <View className='flex-col p-4 w-full  flex-1 justify-start dark:text-white  dark:bg-slate-900 bg-slate-100 '>
            <SearchBar setSearchTerm={setSearchTerm} setResults={setResults} searchTerm={searchTerm} />
            {loadingResults ? <View className='flex-col w-full gap-2'>
                <View className='h-10 w-full flex-1 bg-gray-200 rounded-md animate-pulse' />
                <View className='h-10 w-full bg-gray-200 rounded-md animate-pulse' />
                <View className='h-10 w-full bg-gray-200 rounded-md animate-pulse' />
                <View className='h-10 w-full bg-gray-200 rounded-md animate-pulse' />
            </View> : results.length > 0 && <SearchResults results={results} />}
        </View>
    )
}

export default SearchTitle