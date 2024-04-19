const bem = (block: string, modifiers: [string?, boolean?][] = []) => {
    const classes = [block]

    modifiers.forEach((modifier) => {
        if (modifier[0] && modifier[1]) {
            classes.push(`${block}--${modifier[0]}`)
        }
    })

    return classes.join(' ')
}

export default bem
