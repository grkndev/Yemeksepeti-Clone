import { View, InteractionManager, Platform } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Components from './components'

export default function StoreScreen() {
    // Component loading states using a single state object for better performance
    const [loadingStates, setLoadingStates] = useState({
        headerLoaded: false,
        storeInfoLoaded: false,
        deliveryTimeLoaded: false,
        campaignsLoaded: false,
        menuSectionVisible: false
    });

    // Memoized state updater functions
    const updateLoadingState = useCallback((key: string, value: boolean) => {
        setLoadingStates(prev => ({ ...prev, [key]: value }));
    }, []);

    // Progressive loading strategy with optimized timing
    useEffect(() => {
        // Immediately show the header
        updateLoadingState('headerLoaded', true);

        // Use requestAnimationFrame for smoother initial render
        requestAnimationFrame(() => {
            // Batch state updates
            setLoadingStates(prev => ({
                ...prev,
                storeInfoLoaded: true,
                deliveryTimeLoaded: true
            }));
        });

        // Use InteractionManager for heavy components
        InteractionManager.runAfterInteractions(() => {
            // Load campaigns
            updateLoadingState('campaignsLoaded', true);

            // Load menu section with a small delay
            const menuTimer = setTimeout(() => {
                updateLoadingState('menuSectionVisible', true);
            }, Platform.select({
                ios: 100,
                android: 50,
                default: 50
            }));

            return () => clearTimeout(menuTimer);
        });
    }, [updateLoadingState]);

    return (
        <View style={{ flex: 1 }}>
            {loadingStates.headerLoaded && <Components.Header />}
            {loadingStates.storeInfoLoaded && <Components.StoreInfo />}
            {loadingStates.deliveryTimeLoaded && <Components.DeliveryTime />}
            {loadingStates.campaignsLoaded && <Components.Campaigns />}
            {loadingStates.menuSectionVisible && <Components.MenuSection />}
        </View>
    );
}



