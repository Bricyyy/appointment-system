import React, { useState, useEffect } from 'react';
import { fetchAppointments, createAppointment } from '../utils/api';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, User } from 'lucide-react'

const localizer = momentLocalizer(moment)

interface Appointment {
  id: number
  title: string
  start: Date
  end: Date
  patientName: string
  appointmentType: string
}

const appointmentTypes = [
  "General Checkup",
  "Vaccination",
  "Dental Cleaning",
  "Eye Examination",
  "Physical Therapy"
]

export default function HealthClinicAppointment() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [appointmentTitle, setAppointmentTitle] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [patientName, setPatientName] = useState('')
    const [appointmentType, setAppointmentType] = useState(appointmentTypes[0])
  
    useEffect(() => {
        async function loadAppointments() {
          const data = await fetchAppointments();
          setAppointments(data);
        }
      
        loadAppointments();
      }, []);

    const handleSelectSlot = ({ start }: { start: Date }) => {
      setSelectedDate(start)
      setIsModalOpen(true)
    }
  
    const handleCloseModal = () => {
      setIsModalOpen(false)
      setSelectedDate(null)
      setAppointmentTitle('')
      setAppointmentTime('')
      setPatientName('')
      setAppointmentType(appointmentTypes[0])
    }
  
    const handleSaveAppointment = async () => {
        if (selectedDate && appointmentTitle && appointmentTime && patientName) {
          const [hours, minutes] = appointmentTime.split(':').map(Number);
          const start = new Date(selectedDate);
          start.setHours(hours, minutes);
          const end = new Date(start);
          end.setHours(end.getHours() + 1);
      
          const newAppointment: Appointment = {
            id: Date.now(),
            title: appointmentTitle,
            start,
            end,
            patientName,
            appointmentType,
          };
      
          const savedAppointment = await createAppointment(newAppointment);
          setAppointments([...appointments, savedAppointment]);
          handleCloseModal();
        }
    };
  
    const eventStyleGetter = (event: Appointment) => {
      let backgroundColor = '#3B82F6'
      switch (event.appointmentType) {
        case 'Vaccination':
          backgroundColor = '#10B981'
          break
        case 'Dental Cleaning':
          backgroundColor = '#F59E0B'
          break
        case 'Eye Examination':
          backgroundColor = '#8B5CF6'
          break
        case 'Physical Therapy':
          backgroundColor = '#EC4899'
          break
      }
      return { style: { backgroundColor } }
    }
  
    return (
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Health Clinic Appointment System</CardTitle>
            <CardDescription>Schedule and manage your appointments with ease</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">
              Click on a time slot to schedule a new appointment
            </div>
            <Calendar
              localizer={localizer}
              events={appointments}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectSlot={handleSelectSlot}
              selectable
              views={[Views.WEEK, Views.DAY]}
              defaultView={Views.WEEK}
              min={new Date(0, 0, 0, 8, 0, 0)}
              max={new Date(0, 0, 0, 18, 0, 0)}
              eventPropGetter={eventStyleGetter}
            />
          </CardContent>
        </Card>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule an Appointment</DialogTitle>
              <DialogDescription>
                {selectedDate && (
                  <div className="flex items-center text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {moment(selectedDate).format('MMMM D, YYYY')}
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patientName" className="text-right">
                  Patient Name
                </Label>
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Reason
                </Label>
                <Input
                  id="title"
                  value={appointmentTitle}
                  onChange={(e) => setAppointmentTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select onValueChange={setAppointmentType} defaultValue={appointmentType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveAppointment}>Schedule Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <ul className="space-y-4">
                {appointments.slice(0, 5).map((appointment) => (
                  <li key={appointment.id} className="flex items-center space-x-4 p-2 bg-white rounded-md shadow-sm">
                    <div className={`w-2 h-12 rounded-full ${eventStyleGetter(appointment).style.backgroundColor}`} />
                    <div className="flex-1">
                      <h3 className="font-semibold">{appointment.title}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.appointmentType}</p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center text-sm"><User className="mr-1 h-4 w-4" /> {appointment.patientName}</p>
                      <p className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {moment(appointment.start).format('MMM D, h:mm A')}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">No upcoming appointments</p>
            )}
          </CardContent>
        </Card>
      </div>
    )
}