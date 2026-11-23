import { useState } from 'react'
import './App.css'
import logo from './assets/logo.svg'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { InputGroup, InputGroupAddon, InputGroupInput } from './components/ui/input-group'
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01FreeIcons, PlusFreeIcons } from "@hugeicons/core-free-icons";
import { defaultTask } from './datas/defaultTask';
import { ItemTodo } from './components/app/item-todo'
import type { Todo } from './types/type-todo';
import { Button } from './components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from './components/ui/textarea'

function App() {

  // useState
  const [tasks, setTasks] = useState<Todo[]>(defaultTask)
  const [search, setSearch] = useState("")
  const [editedTask, setEditedTask] = useState<Todo | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [formInput, setFormInput] = useState({
    task: '',
    notes: '',
  })

  // functions
  const handleNew = () => {
    setEditedTask(null)
    setFormInput({ task: '', notes: '' })
    setDrawerOpen(true)
  }

  const handleEdit = (todo: Todo) => {
    setEditedTask(todo)
    setFormInput({ task: todo.task, notes: todo.notes ?? "" })
    setDrawerOpen(true)
  }

  const handleDelete = (todo: Todo) => {
    setTasks(tasks.filter((t) => t.id !== todo.id))
  }

  const handleToggle = (todo: Todo) => {
    setTasks(tasks.map((t) => t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase())
  }

  // form submission
  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedTask) {
      const editTask: Todo = {
        ...formInput,
        id: editedTask.id,
        isCompleted: editedTask.isCompleted,
      }
      setTasks(tasks.map((t) => t.id === editedTask.id ? editTask : t))
      setEditedTask(null)
    } else {
      const newTodo: Todo = {
        id: tasks.length + 1,
        ...formInput,
        isCompleted: false,
      }
      setTasks([...tasks, newTodo])
    }

    setFormInput({ task: '', notes: '' })
    setDrawerOpen(false)
  }

  return (
    <main className='max-w-2xl w-full mx-auto p-4'>
      <header className='flex jutify-between py-8 items-center gap-4 border-b border-stone-200 flex-wrap md:flex-nowrap'>
        <div>
          <div className='flex justify-start gap-4'>
            <Avatar className='size-12'>
              <AvatarImage src={logo} />
              <AvatarFallback>RT</AvatarFallback>
            </Avatar>
            <div>
              <h1 className='font-bold'>To Do</h1>
              <p className='text-xs text-stone-500'>Simple CRUD To Do List</p>
            </div>
          </div>
        </div>

        {/* Pencarian tasks */}
        <InputGroup className="w-full py-6 px-2">
          <InputGroupInput placeholder="Cari task..." onChange={(e) => handleSearch(e)} />
          <InputGroupAddon>
            <HugeiconsIcon icon={Search01FreeIcons} size={18} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">{tasks.filter((todo) => todo.task.toLowerCase().includes(search.toLowerCase())).length || 0} tasks</InputGroupAddon>
        </InputGroup>
      </header>

      {/* Item untuk todo list */}
      <section className='py-4'>
        {
          tasks.filter((todo) => todo.task.toLowerCase().includes(search)).map((todo) => (
            <ItemTodo
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        }

        <div className='py-6'></div>
      </section>

      {/* Trigger button add task */}
      <Button
        onClick={handleNew}
        className='fixed md:bottom-8 md:right-16 bottom-4 right-4 rounded-full py-6 px-8 cursor-pointer'>
        <HugeiconsIcon icon={PlusFreeIcons} size={18} />
        Tambah Task
      </Button>

      {/* Drawer Form */}
      <Drawer showSwipeHandle open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{editedTask ? 'Edit Task' : 'Form Task'}</DrawerTitle>
            <DrawerDescription>{editedTask ? `Edit task '${editedTask.task}'` : 'Buat task baru.'}</DrawerDescription>
          </DrawerHeader>
          <div className="md:w-sm w-full mx-auto">
            <form className="p-4" onSubmit={handleSubmission}>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="task">
                      Nama tugas *
                    </FieldLabel>
                    <Input
                      autoFocus
                      id="task"
                      placeholder="Nama Tugas"
                      required
                      value={formInput.task}
                      onChange={(e) => setFormInput({ ...formInput, task: e.target.value })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="catatan">
                      Catatan
                    </FieldLabel>
                    <Textarea
                      id="catatan"
                      placeholder="Tambahkan catatan"
                      className="resize-none w-full"
                      value={formInput.notes}
                      onChange={(e) => setFormInput({ ...formInput, notes: e.target.value })}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Button type='submit' className='w-full mt-4 mb-8'>
                Simpan
              </Button>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  )
}

export default App
