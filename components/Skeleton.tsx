import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue } from 'react-native-reanimated'
import { cn } from '@/utils/utils'

type SkeletonProps = {
    width?: DimensionValue
    height?: DimensionValue
    className?: string
    rounded?: string
    disableAnimation?: boolean
    lowPerformanceMode?: boolean
}

// Keep track of how many skeletons are rendered at once to optimize performance
let activeSkeletonCount = 0;

export default function Skeleton({ 
    width = '100%', 
    height = '100%',
    className = '',
    rounded = 'rounded-lg',
    disableAnimation = false,
    lowPerformanceMode = false
}: SkeletonProps) {
    const opacity = useSharedValue(1);

    // Track skeleton instance count to help optimize performance
    useEffect(() => {
        activeSkeletonCount++;
        return () => {
            activeSkeletonCount--;
        };
    }, []);

    // Only animate if animations are enabled and we're not in low performance mode
    // If there are too many skeletons being rendered at once, also disable animations
    useEffect(() => {
        if (!disableAnimation && !lowPerformanceMode && activeSkeletonCount < 10) {
            opacity.value = 1;
            const timeout = setTimeout(() => {
                opacity.value = withRepeat(
                    withSequence(
                        withTiming(0.7, { duration: 1200 }),
                        withTiming(1, { duration: 1200 })
                    ),
                    -1,
                    true
                );
            }, 300);
            
            return () => clearTimeout(timeout);
        }
    }, [disableAnimation, lowPerformanceMode, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        };
    });

    const styles = StyleSheet.create({
        container: {
            width,
            height
        }
    });

    // For extremely performance-sensitive situations or when there are too many skeletons,
    // use a standard View instead of Animated.View
    if (disableAnimation || lowPerformanceMode || activeSkeletonCount > 15) {
        return (
            <View
                style={styles.container}
                className={cn(`bg-zinc-200 ${rounded}`, className)}
            />
        );
    }

    return (
        <Animated.View
            style={[styles.container, animatedStyle]}
            className={cn(`bg-zinc-200 ${rounded}`, className)}
        />
    );
} 