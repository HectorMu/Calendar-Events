import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

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
    endHour: 16
  },
  {
    id: 3,
    day: 5,
    startHour: 14,
    endHour: 22
  },
  {
    id: 2,
    day: 1,
    startHour: 18,
    endHour: 20
  }
]
export default function EventsCalendar() {
  return (
    <div className="overflow-x-auto w-full">
      <div className="grid grid-cols-8 gap-10   w-full relative">
        <div className="sticky left-0 top-0 z-10">
          <h2 className="mb-4">{'Horas'}</h2>
          <div>
            {hours.map((item) => (
              <div key={item} className="h-8 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
        {days.map((item) => (
          <CalendarDayItem
            dayEvents={events.filter((event) => event.day === item)}
            key={item}
            day={item}
          />
        ))}
      </div>
    </div>
  )
}

interface CalendarDayItemProps {
  day: number
  dayEvents: CalendarEvent[]
}

const CalendarDayItem = ({ day, dayEvents }: CalendarDayItemProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null)

  const onDelete = () => {
    alert('Eliminar?')
  }

  return (
    <div>
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>Editar horario</DialogHeader>

          <div className="flex gap-3 flex-col">
            <Input value={selectedEvent?.startHour} />
            <Input value={selectedEvent?.endHour} />
          </div>
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h2 className="mb-4">{dayLabel[day] ?? ''}</h2>
      <div className="relative">
        {hours.map((hour) => {
          const hourEvent = dayEvents.find(
            (event) => event.startHour <= hour && hour <= event.endHour
          )

          if (hourEvent) {
            const isFirstInEvent = hour === hourEvent.startHour
            const isLastInEvent = hour === hourEvent.endHour

            const classNames = `h-8 relative ${
              isFirstInEvent ? 'rounded-tl rounded-tr' : ''
            } ${isLastInEvent ? 'rounded-bl rounded-br' : ''} ${
              hour >= hourEvent.startHour && hour <= hourEvent.endHour
                ? 'bg-blue-700'
                : ''
            }`

            const handleEventClick = () => setSelectedEvent(hourEvent)
            const handleMouseEnter = () => setHoveredEvent(hourEvent)
            const handleMouseLeave = () => setHoveredEvent(null)

            return (
              <div
                onClick={handleEventClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={hour}
                className={classNames}
              >
                {hoveredEvent?.id === hourEvent.id && isFirstInEvent && (
                  <>
                    <Button
                      variant={'outline'}
                      size={'xs'}
                      onClick={(e) => {
                        // prevent click event to reach the parent div
                        e.stopPropagation()
                        onDelete()
                      }}
                      className="-right-5 -top-4 absolute"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}

                {isFirstInEvent && (
                  <>
                    <p className="text-white text-xs absolute left-1 top-2">{`${hourEvent.startHour}:00 - ${hourEvent.endHour}:00`}</p>
                  </>
                )}
              </div>
            )
          }
          return <div key={hour} className="h-8"></div>
        })}
      </div>
    </div>
  )
}
