import { Page } from '@playwright/test'
import { AlbumView } from '../views/AlbumView'
import { ArchiveView } from '../views/ArchiveView'
import { OverviewView } from '../views/OverviewView'
import { AlbumsView } from '../views/AlbumsView'
import { TrashView } from '../views/TrashView'
import { DetailView } from '@/__tests__/e2e/views/DetailView'
import { FavoritesView } from '@/__tests__/e2e/views/FavoritesView'
export class User {
    constructor (public page: Page) {
    }

    archiveView () {
        return new ArchiveView(this)
    }

    overviewView () {
        return new OverviewView(this)
    }

    albumsView () {
        return new AlbumsView(this)
    }

    albumView (id?: string) {
        return new AlbumView(this, id)
    }

    trashView () {
        return new TrashView(this)
    }

    detailView (id?: string) {
        return new DetailView(this, id)
    }

    favoritesView () {
        return new FavoritesView(this)
    }
}
