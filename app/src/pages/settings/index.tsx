import Layout from '../../layouts/layout'
import { Uploader } from '../../components'

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
                    </ul>
                </div>
            </div>
        </section>
    </Layout>
}

export default SettingsPage
