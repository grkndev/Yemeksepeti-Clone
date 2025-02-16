import { icons } from "lucide-react-native";

const Icons = (
    { name, size, color }: { name: keyof typeof icons, size: number, color: string }
) => {
    const LucideIcon = icons[name]
    return <LucideIcon size={size} color={color} />

}

export default Icons;