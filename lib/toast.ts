import { toast } from "sonner"

export function toast_msg({title, description, type}:{title: string, description?: string, type?:('success'|'danger'|'primary') }) {
    toast(title, {
            description: description,
            action: {
                label: "close",
                onClick: () => {},
        },style:{
            fontFamily: "Montserrat",
            font: '13px',
            color: `${type === 'danger'? '#FF3333': ''}`,
            background: `${type === 'danger' ? '#ffffff': '#ffffff'}`,
            border: `none`,
            display: 'flex',
            alignItems: 'end'
        },actionButtonStyle:{
            background: '#FF3333',
            
        }
    })
}