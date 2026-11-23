import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TrashFreeIcons, PencilEdit01FreeIcons, EllipsisVertical } from "@hugeicons/core-free-icons";
import type { Todo } from "@/types/type-todo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react";

interface ItemTodoProps {
    todo: Todo,
    onEdit: (todo: Todo) => void,
    onDelete: (todo: Todo) => void,
    onToggle: (todo: Todo) => void,
}

export const ItemTodo = ({ todo, onEdit, onDelete, onToggle }: ItemTodoProps) => {

    return (
        <Item variant="outline" className="mb-3">
            <ItemActions>
                <Checkbox checked={todo.isCompleted} onCheckedChange={() => onToggle(todo)} />
            </ItemActions>
            <ItemContent>
                <ItemTitle className={`${todo.isCompleted ? "line-through" : ""} text-base`}>{todo.task}</ItemTitle>
                {todo.notes && <ItemDescription className="text-xs text-stone-500">{todo.notes}</ItemDescription>}
            </ItemContent>
            <ItemActions>
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button variant={"ghost"}><HugeiconsIcon icon={EllipsisVertical} /></Button>
                    } />
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onEdit(todo)} className="cursor-pointer">
                            <HugeiconsIcon icon={PencilEdit01FreeIcons} />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(todo)} variant="destructive" className="cursor-pointer">
                            <HugeiconsIcon icon={TrashFreeIcons} />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </ItemActions>
        </Item>
    )
}