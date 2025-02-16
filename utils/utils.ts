import classnames from 'classnames'

export function cn(...classes: (string | boolean | undefined)[]) {
    return classnames(classes.filter(Boolean) as string[])
}