import { View, InteractionManager, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import Components from './components'

export default function StoreScreen() {
    // Component loading states
    const [headerLoaded, setHeaderLoaded] = useState(false);
    const [storeInfoLoaded, setStoreInfoLoaded] = useState(false);
    const [deliveryTimeLoaded, setDeliveryTimeLoaded] = useState(false);
    const [campaignsLoaded, setCampaignsLoaded] = useState(false);
    const [menuSectionVisible, setMenuSectionVisible] = useState(false);

    // Progressive loading strategy
    useEffect(() => {
        // Immediately show the header
        setHeaderLoaded(true);

        // Use InteractionManager to ensure UI is responsive during initial rendering
        const task = InteractionManager.runAfterInteractions(() => {
            // Batch state updates to minimize render cycles
            setStoreInfoLoaded(true);
            setDeliveryTimeLoaded(true);
        });

        // Then add campaigns with a very short delay
        const campaignsTimer = setTimeout(() => {
            setCampaignsLoaded(true);
        }, Platform.OS === 'ios' ? 50 : 30);
        
        // Finally load the heavy MenuSection component
        const menuSectionTimer = setTimeout(() => {
            setMenuSectionVisible(true);
        }, Platform.OS === 'ios' ? 150 : 100);
        
        return () => {
            task.cancel();
            clearTimeout(campaignsTimer);
            clearTimeout(menuSectionTimer);
        };
    }, []);

    return (
        <View className='flex-1 bg-white py-2'>
            {headerLoaded && <Components.Header />}
            {storeInfoLoaded && <Components.StoreInfo />}
            {deliveryTimeLoaded && <Components.DeliveryTime />}
            {campaignsLoaded && <Components.Campaigns />}
            
            {menuSectionVisible && (
                <View className="flex-1">
                    <Components.MenuSection />
                </View>
            )}
        </View>
    )
}



