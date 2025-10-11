import type { ChangeEvent } from "react"

export type buttonStyle = 'projeto_button' | 'sidebar_label'

export type BaseButton = {
    text?: string,
    onClick?: () => void,

    iconClass?: string
}

export type ButtonProps = | (
    //Botão de arquivo
    BaseButton & {
        style: buttonStyle

        file: File
        onDelete?: () => void
        to?: never
        fileInput?: never
    }
) | (
    //Botão de navegação
    BaseButton & {
        style?: never
        file?: never

        to: string
        type?: 'header' | 'sidebar'
        end?: boolean

        fileInput?: never
    }
) | (
    //Botão de upload de arquivos
    BaseButton & {
        style: buttonStyle
        file?: never
        to?: never
        
        fileInput: Boolean
        onChange?: (e : ChangeEvent<HTMLInputElement>) => void
    }
)