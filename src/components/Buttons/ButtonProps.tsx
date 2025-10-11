import type { ChangeEvent } from "react"

export type buttonStyle = 'projeto_button' | 'sidebar_label'

export type BaseButton = {
    text?: string,
    onClick?: () => void,
    spaced?: boolean

    iconClass?: string
}

export type ButtonProps = | (
    BaseButton & {
        style: buttonStyle

        file: File
        onDelete?: () => void
        to?: never
        fileInput?: never
    }
) | (
    BaseButton & {
        style?: never
        file?: never

        to: string
        type?: 'header' | 'sidebar'
        end?: boolean

        fileInput?: never
    }
) | (
    BaseButton & {
        style: buttonStyle
        file?: never
        to?: never
        
        fileInput: Boolean
        onChange?: (e : ChangeEvent<HTMLInputElement>) => void
        
    }
)