import type { Todo } from "@/types/type-todo";

export const defaultTask: Todo[] = [
    {
        id: 1,
        task: 'Mengerjakan Task FizzBuzz',
        notes: 'Menggunakan typescript dan class method',
        isCompleted: false
    },
    {
        id: 2,
        task: 'Mengerjakan Task Todo List',
        notes: 'Menggunakan component react dan typescript',
        isCompleted: false
    }
];