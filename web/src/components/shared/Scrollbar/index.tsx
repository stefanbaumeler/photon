import { ScrollbarProvider } from '@/components/shared/Scrollbar/components/ScrollbarContext'
import { VisualScrollbar } from '@/components/shared/Scrollbar/components/VisualScrollbar'

export const Scrollbar = () => {
    return <ScrollbarProvider>
        <VisualScrollbar />
    </ScrollbarProvider>
}
