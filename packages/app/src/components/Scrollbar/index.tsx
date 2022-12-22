import { ScrollbarProvider } from './ScrollbarContext'
import ScrollbarComponent from './Scrollbar'

export const Scrollbar = () => {
    return <ScrollbarProvider>
        <ScrollbarComponent />
    </ScrollbarProvider>
}
