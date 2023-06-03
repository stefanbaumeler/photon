type Props = {
    level: 1 | 2 | 3 | 5 | 6
    text?: string
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export const Heading = ({
    level, text
}: Props) => {
    const Tag = `h${level}` as HeadingTag

    return <Tag className={`heading heading--${level}`}>
        {text}
    </Tag>
}
