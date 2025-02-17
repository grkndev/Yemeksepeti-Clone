import 'react-native-svg'
import { icons } from "lucide-react-native";
import { SvgProps } from 'react-native-svg';

interface IconProps {
    name: keyof typeof icons,
    size?: number,
    color?: string,
}
const Icons = (
    { name, size = 24, color = '#fff', ...props }: IconProps & SvgProps
) => {
    const LucideIcon = icons[name]
    return <LucideIcon size={size} color={color} {...props} />

}

export default Icons;