import { toast } from "sonner"

export function toast_msg({title, description}:{title: string, description?: string}) {
    toast(title, {
            description: description,
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
        },
    })
}