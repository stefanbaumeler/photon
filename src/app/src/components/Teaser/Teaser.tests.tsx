// import { render, screen } from '@/tests'
// import userEvent  from '@testing-library/user-event'
// import { Teaser } from './'
// import data from '@/../../../tests/fixtures/data/QMedium.json'
//
// jest.mock('next/router', () => ({
//     useRouter () {
//         return {
//             route: '/',
//             pathname: '',
//             query: '',
//             asPath: ''
//         }
//     }
// }))
//
// it('works', async () => {
//     render(
//         <Teaser
//             medium={data.medium}
//             width={data.medium.meta.width}
//             height={data.medium.meta.width}
//         />
//     )
//
//     screen.findByTestId('teaser-check')
//
//     const teaser = await screen.findByTestId('teaser')
//     const check = await screen.findByTestId('teaser-check')
//     const image = await screen.findByTestId('teaser-image')
//
//     expect(image).toHaveAttribute('src', expect.stringContaining(data.medium.filenameDisk))
//
//     userEvent.click(check).then(() => {
//         expect(teaser).toHaveClass('teaser--selected')
//     })
// })
