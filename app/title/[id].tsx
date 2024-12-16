import { View, Text, ActivityIndicator, Pressable, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getTitleDetails } from '@/queries'
import { useQuery } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { ImageBackground } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage'
type Props = {}

const TitleDetailsScreen = (props: Props) => {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [title, setTitle] = useState<TitleDetails | undefined>()
    const { data, isLoading } = useQuery({
        queryKey: ['title', id],
        queryFn: () => getTitleDetails(id as string)
    })

    useEffect(() => {
        if (!data) return
        setTitle({
            title: data.titleText.text,
            description: data.plot.plotText.plainText,
            releaseYear: data.releaseYear.year,
            poster: data.primaryImage?.url,
            runtime: data.runtime?.seconds,
            genres: data.genres?.genres?.map((genre: { text: string }) => genre.text),
            rating: data.ratingsSummary?.aggregateRating,
            videos: data.primaryVideos?.edges


        })
    }, [data])
    const handleAddToWatchlist = async () => {
        if (!title) return
        startTransition(() => {
            AsyncStorage.getItem('watchlist').then(existingMovies => {
                if (existingMovies) {
                    const parsedMovies = JSON.parse(existingMovies)
                    if (parsedMovies.find((movie: TitleDetails) => movie.title === title.title)) {
                        Toast.show({
                            text1: 'Title already in watchlist',
                            type: 'error'
                        })
                        return
                    }
                    parsedMovies.push(title)
                    AsyncStorage.setItem('watchlist', JSON.stringify(parsedMovies)).then(() => {
                        Toast.show({
                            text1: 'Title added to watchlist',
                            type: 'success'
                        })
                        router.replace('/')
                    })
                } else {
                    AsyncStorage.setItem('watchlist', JSON.stringify([title]))
                }
            })
        })

    }
    if (isLoading) return <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' />
    </View>
    return (
        <ScrollView >
            {title?.poster && <ImageBackground source={{ uri: title.poster }} className=' rounded-md' contentFit='contain'  >
                <View className='h-[600px] w-full '>

                </View>
            </ImageBackground>}
            <View className='p-4 '>
                <View className='flex-row flex-wrap gap-4'>
                    <Text className='text-3xl dark:text-white font-bold'>{title?.title}</Text>
                    {title?.genres && <View className='flex-row gap-2 flex-wrap justify-start items-center'>
                        {
                            title?.genres.map((genre, i) =>
                                <Text key={i} className='text-gray-500 p-1 border border-gray-500 rounded-full'>{genre}</Text>
                            )

                        }
                    </View>}
                </View>
                <View className='flex-row gap-2 mt-2 justify-start items-center'>
                    <Text className='text-lg dark:text-white'>IMDB </Text>
                    <Text className='text-lg dark:text-yellow-500'>{title?.rating}</Text>
                </View>
                <Text className='text-lg dark:text-gray-500'>{title?.description}</Text>
            </View>
            <Pressable disabled={isPending} className='w-full justify-center items-center bg-purple-500 p-6 rounded-full' onPress={handleAddToWatchlist}  >
                <Text className='text-white text-lg'>{isPending ? 'Adding...' : 'Add to Watchlist'}</Text>
            </Pressable>
        </ScrollView>
    )
}

export default TitleDetailsScreen