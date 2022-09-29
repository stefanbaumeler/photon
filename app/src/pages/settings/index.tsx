import Layout from '@/layouts/layout'
import { useMedia } from '@/api/hooks'
import { Uploader } from '@/components'

const SettingsPage = () => {
    const { state: [{ media }] } = useMedia()

    return <Layout>
        <section>
            <div>
                <Uploader />
                <div>
                    <h1>
                        Settings
                    </h1>
                    <ul>
                        <li>
                            Trash deletion offset
                        </li>
                        <li>
                            Language
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </Layout>
}

export default SettingsPage
