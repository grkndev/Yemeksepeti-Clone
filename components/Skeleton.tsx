import { View, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated'
import { cn } from '@/utils/utils'

type SkeletonProps = {
    width?: number | string
    height?: number | string
    className?: string
    rounded?: string
}

export default function Skeleton({ 
    width = '100%', 
    height = '100%',
    className = '',
    rounded = 'rounded-lg'
}: SkeletonProps) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withRepeat(
                withSequence(
                    withTiming(0.5, { duration: 1000 }),
                    withTiming(1, { duration: 1000 })
                ),
                -1,
                true
            )
        }
    })

    const styles = StyleSheet.create({
        container: {
            width,
            height
        }
    })

    return (
        <Animated.View
            style={[styles.container, animatedStyle]}
            className={cn(`bg-zinc-200 ${rounded}`, className)}
        />
    )
} 