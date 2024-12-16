import { View, Text, FlatList, Pressable } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { Link, router } from 'expo-router'
import { BlurView } from 'expo-blur'

type Props = { results: SearchTitle[] }

const SearchResults = ({ results }: Props) => {
    return (
        <View className='flex-1 w-full py-4'>
            <FlatList
                data={results}
                renderItem={({ item }) => <SearchResultItem item={item} />}
            />
            <BlurView />
        </View>
    )
}

export default SearchResults
const SearchResultItem = ({ item }: { item: SearchTitle }) => {
    return item.titlePosterImageModel?.url && <Link href={`/title/${item.id}`} className='my-4 flex-1 w-full rounded-md ' >
        <View className='flex-row gap-4  items-center  '>
            <Image source={{ uri: item.titlePosterImageModel.url }} style={{ width: 50, height: 50 }} className='w-20 h-20 bg-contain object-contain rounded-md' />
            <View className='flex-col gap-2 '>
                <Text className='text-2xl break-all text-black dark:text-white font-bold'>{item.titleNameText}</Text>
                {item.titleTypeText && <Text className='text-lg text-black dark:text-white'>{item.titleTypeText}</Text>}
                <Text className='text-lg text-gray-500'>{item.titleReleaseText}</Text>
            </View>
        </View>
    </Link>
}
