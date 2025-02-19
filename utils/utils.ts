import classnames from 'classnames'

export function cn(...classes: (string | boolean | undefined)[]) {
    return classnames(classes.filter(Boolean) as string[])
}

export function truncate(str: string, max: number, len: number) {
    return str.length > max ? str.substring(0, len) + "..." : str;
}