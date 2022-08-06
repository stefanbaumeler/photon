const MainNav = () => {
    const items = [
        'Photos',
        'Albums',
        'Shares',
        'Archive',
        'Trash',
        'Settings'

        // Profile
        // Sync
        // API
        // Partner
        // Defaults
        // Import / Export
        // Notifications
    ]

    return <nav className="main-nav">
        <ul className="main-nav__list">
            {items.map((item, key) =>
                <li
                    key={key}
                    className="main-nav__item"
                >
                    <a
                        href="#"
                        className="main-nav__link"
                    >
                        <span className="main-nav__icon" />
                        {item}
                    </a>
                </li>
            )}
        </ul>
    </nav>
}

export default MainNav
