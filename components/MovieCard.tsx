import { View, Text, Pressable, ImageBackground } from 'react-native'
import React, { useState, useTransition } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    title: TitleSchema
    refetch: () => void
}

const MovieCard = ({ title, refetch }: Props) => {
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [isPending, startTransition] = useTransition()
    const handleLongPress = () => {
        setShowDeleteButton(true)
    }
    const handlePress = () => {
        setShowDeleteButton(false)
    }
    const handleDelete = async () => {
        const existingMovies = await AsyncStorage.getItem('watchlist')
        if (existingMovies) {
            startTransition(() => {
                const parsedMovies = JSON.parse(existingMovies)
                const newMovies = parsedMovies.filter((movie: TitleDetails) => movie.title !== title.title)
                AsyncStorage.setItem('watchlist', JSON.stringify(newMovies)).then(() => {
                    Toast.show({
                        text1: 'Title removed from watchlist',
                        type: 'success'
                    })
                }).
                    catch(() => {
                        Toast.show({
                            text1: 'Error removing title from watchlist',
                            type: 'error'
                        })
                    })
            })
        }
        else {
            Toast.show({
                text1: 'No movies in watchlist',
                type: 'error'
            })
        }
        refetch()
    }
    return (
        <Pressable onPress={handlePress} onLongPress={handleLongPress} className='gap-2 overflow-clip w-full h-auto min-h-80 rounded-lg flex-1 shadow-md  border border-slate-300 dark:border-slate-800'>
            <ImageBackground className='flex-1 p-2 rounded-md' resizeMode='cover' source={{ uri: title.poster }} >
                {/* <Image source={title.poster} className='w-48 h-auto' contentFit='cover' style={{ width: 150, height: 250 }} /> */}
                {/* <LinearGradient
                colors={['transparent', 'black']}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            /> */}
                <View className=' absolute bottom-1 flex-row flex-wrap items-center bg-black/40  rounded-md left-1 p-2 gap-2'>
                    <Text className=' text-2xl text-white  font-bold'>{title.title}</Text>
                    <Text className='text-yellow-300'>{title.rating}</Text>
                </View>
                {showDeleteButton && <Pressable className='flex-row items-center gap-2 justify-center w-full bg-red-500  p-4 rounded-md' disabled={isPending} onPress={handleDelete}>
                    <Ionicons name='trash' color={'white'} />
                    {!isPending && <Text className='text-white'>Mark as watched</Text>}
                    {isPending && <Text className='text-white'>Deleting...</Text>}
                </Pressable>}
            </ImageBackground>
        </Pressable>
    )
}

export default MovieCard