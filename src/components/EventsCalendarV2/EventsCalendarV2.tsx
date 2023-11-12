import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

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

export default function EventsCalendarV2() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Horas</TableHead>
          {days.map((item) => (
            <TableHead key={item}>{dayLabel[item]}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {hours.map((item) => (
          <TableRow key={item} className="">
            <TableCell>{item}</TableCell>
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
                      rowSpan={schedule.endHour - schedule.startHour + 1}
                      className="bg-blue-700 text-white text-center rounded-lg"
                      key={`${item}-${d}`}
                    >
                      Evento
                    </TableCell>
                  )
                } else {
                  return null
                }
              }

              return <TableCell key={`${item}-${d}`}></TableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
