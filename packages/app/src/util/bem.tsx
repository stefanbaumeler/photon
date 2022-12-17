const bem = (block: string, modifiers: [string, boolean?][]) => {
    const classes = [block]

    modifiers.forEach((modifier) => {
        // if (typeof modifier[1] === 'undefined') {
        //     classes.push(`${block}--${modifier[0]}`)
        // }

        if (modifier[1]) {
            classes.push(`${block}--${modifier[0]}`)
        }
    })

    return classes.join(' ')
}

export default bem
