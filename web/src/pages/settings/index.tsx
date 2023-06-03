import Layout from '../../layouts/layout'
import { Uploader } from 'web/src/components'

const SettingsPage = () => {
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
                        <li>
                            Default view
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </Layout>
}

export default SettingsPage
