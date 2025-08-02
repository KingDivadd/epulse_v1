import { toast } from "sonner"

export function toast_msg({title, description, type}:{title: string, description?: string, type?:('success'|'danger'|'primary') }) {
    toast(title, {
            description: description,
            action: {
                label: "close",
                onClick: () => {},
        },style:{
            fontFamily: "Montserrat",
            color: `${type === 'danger'? '#FF3333': ''}`,
            background: `${type === 'danger' ? '#FFF5F5': '#ffffff'}`,
            border: `none`
        },actionButtonStyle:{
            background: '#FF3333',
            
        }
    })
}