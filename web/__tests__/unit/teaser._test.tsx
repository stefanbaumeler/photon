export {}
// import { render, screen } from '@testing-library/react'
// import userEvent  from '@testing-library/user-event'
// import { Teaser } from '@/components'
// import medium from '../fixtures/medium'
// import { I18nextProvider } from 'react-i18next'
// import i18next from '@/translations'
// import { SelectionProvider } from '@/providers'
// import { TMedium } from '@photon/schema/dist/client'
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
// const TestTeaser = ({ overrides }: { overrides?: Partial<TMedium> }) => {
//     const mediumToRender = {
//         ...medium,
//         ...overrides
//     }
//
//     return <I18nextProvider i18n={i18next}>
//         <SelectionProvider>
//             <Teaser
//                 element={mediumToRender}
//                 width={mediumToRender.meta.width}
//                 height={mediumToRender.meta.width}
//             />
//         </SelectionProvider>
//     </I18nextProvider>
// }
//
// it('can select', async () => {
//     const user = userEvent.setup()
//     render(<TestTeaser />)
//
//     const teaser = await screen.findByTestId('teaser')
//     const check = await screen.findByTestId('teaser-check')
//     const image = await screen.findByTestId('teaser-image')
//
//     expect(image).toHaveAttribute('src', expect.stringContaining(medium.filenameDisk))
//
//     await user.click(check)
//     expect(teaser).toHaveClass('teaser--selected')
//     await user.click(check)
//     expect(teaser).not.toHaveClass('teaser--selected')
// })
//
// it('can display favorite', async () => {
//     const { rerender } = render(<TestTeaser />)
//
//     const visibleFavoriteMark = await screen.findByTestId('favorite-mark')
//
//     expect(visibleFavoriteMark).toBeInTheDocument()
//
//     rerender(<TestTeaser overrides={{
//         favoredBy: []
//     }}
//     />)
//
//     const hiddenFavoriteMark = await screen.queryByTestId('favorite-mark')
//
//     expect(hiddenFavoriteMark).not.toBeInTheDocument()
// })
//
// export default {}
