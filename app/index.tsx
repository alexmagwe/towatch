import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'
import MovieCard from '@/components/MovieCard'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}

const home = (props: Props) => {
    const [movies, setMovies] = useState<TitleSchema[]>([])
    const [isPending, startTransition] = useTransition()
    const fetchWatchlist = () => {
        AsyncStorage.getItem('watchlist').then(existingMovies => {
            if (existingMovies) {
                setMovies(JSON.parse(existingMovies))
            }
        })
    }
    useEffect(() => {
        startTransition(() => {
            fetchWatchlist()
        })
    }, [])
    if (isPending) return <Text>Loading...</Text>
    return (
        <View className='flex-col p-4 w-full  flex-1 justify-start dark:text-white  dark:bg-slate-900 bg-slate-100 '>
            <FlatList
                onRefresh={fetchWatchlist}
                refreshing={isPending}
                contentContainerClassName=' py-6'
                columnWrapperClassName='gap-4 w-full justify-between'
                ItemSeparatorComponent={() => <View className='h-4' />}
                numColumns={2} data={movies} renderItem={({ item }) => <MovieCard refetch={fetchWatchlist} title={item} />} />
            <Pressable onPress={() => router.push('/search')} className='absolute bottom-8 right-8 bg-purple-500 p-6 rounded-full'>
                <Ionicons name='add' size={24} color='white' />
            </Pressable>

        </View>
    )
}

export default home