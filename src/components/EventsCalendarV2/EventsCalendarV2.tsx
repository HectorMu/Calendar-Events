import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus, Trash2 } from 'lucide-react'

const days = [0, 1, 2, 3, 4, 5, 6]

const dayLabel: Record<number, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado'
}

const hours = Array.from({ length: 24 }, (_, index) => index)

interface CalendarEvent {
  id: number
  day: number
  startHour: number
  endHour: number
}
const events: CalendarEvent[] = [
  {
    id: 1,
    day: 1,
    startHour: 0,
    endHour: 1
  },
  {
    id: 2,
    day: 1,
    startHour: 3,
    endHour: 5
  },
  {
    id: 2,
    day: 3,
    startHour: 3,
    endHour: 5
  }
]

interface ScheduleFormProps {
  schedule?: Partial<CalendarEvent> | null
}

const ScheduleForm = ({ schedule }: ScheduleFormProps) => {
  return (
    <div className="flex gap-3 flex-col">
      <Input value={schedule?.startHour} />
      <Input value={schedule?.endHour} />
    </div>
  )
}

export default function EventsCalendarV2() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const [selectedHour, setSelectedHour] = useState<Omit<
    CalendarEvent,
    'id'
  > | null>(null)

  const [selectedDeleteId, setSelectedDeleteId] = useState(0)

  return (
    <>
      <Dialog
        open={selectedDeleteId > 0}
        onOpenChange={() => setSelectedDeleteId(0)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>¿Eliminar evento?</DialogHeader>
          <DialogFooter>
            <Button type="submit">Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            Editar horario para el {dayLabel[selectedHour?.day ?? 0] ?? ''}
          </DialogHeader>
          <ScheduleForm schedule={selectedEvent} />
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedHour} onOpenChange={() => setSelectedHour(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>Agregar horario</DialogHeader>
          <DialogDescription>
            Configurar horario para el {dayLabel[selectedHour?.day ?? 0] ?? ''}
          </DialogDescription>
          <ScheduleForm schedule={selectedHour} />
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader className="sticky top-0 h-full">
          <TableRow>
            <TableHead>Horas</TableHead>
            {days.map((item) => (
              <TableHead key={item}>{dayLabel[item]}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {hours.map((item) => (
            <TableRow key={item} className="hover:bg-transparent text-xs">
              <TableCell className="w-6">{item}</TableCell>
              {days.map((d) => {
                const schedule = events.find(
                  (event) =>
                    event.startHour <= item &&
                    item <= event.endHour &&
                    event.day === d
                )

                if (schedule) {
                  if (item === schedule.startHour) {
                    return (
                      <TableCell
                        onClick={() => setSelectedEvent(schedule)}
                        rowSpan={schedule.endHour - schedule.startHour + 1}
                        className="bg-blue-700 text-white text-center rounded-lg relative group"
                        key={`${item}-${d}`}
                      >
                        Evento
                        <Button
                          variant={'destructive'}
                          size={'xs'}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedDeleteId(schedule.id)
                          }}
                          className="absolute -top-3 -right-2 text-black opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )
                  } else {
                    return null
                  }
                }

                return (
                  <TableCell
                    className="hover:bg-primary/10 transition-all hover:cursor-pointer group"
                    onClick={() => {
                      setSelectedHour({
                        day: d,
                        startHour: item,
                        endHour: item + 1
                      })
                    }}
                    key={`${item}-${d}`}
                  >
                    <div className="flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="text-primary/50" />
                    </div>
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
