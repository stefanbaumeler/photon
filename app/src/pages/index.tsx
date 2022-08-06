import Layout from '@/layouts/layout'

const Home = () => {
    const data = {
        upload: ''
    }
    const change = (event: Event) => {
        const formData = new FormData()

        const target = event.target as HTMLInputElement

        const file = target.files[0]

        formData.append(
            'upload',
            file,
            file.name
        )

        fetch('http://localhost:4000/media', {
            method: 'post',
            body: formData
        })
    }

    const upload = () => {
        console.log(data)
    }

    return <Layout>
        <section className="flex">
            <div>
                <input
                    type="file"
                    onChange={change}
                />
                <button onClick={upload}></button>
            </div>
        </section>
    </Layout>
}

export default Home
