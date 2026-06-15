import type { ReactElement } from "react"

interface PageData {
    id: number,
    path: string,
    name: string,
    page: ReactElement
}

export type { PageData }