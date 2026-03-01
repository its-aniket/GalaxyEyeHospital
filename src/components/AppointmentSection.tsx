import { useState } from "react";
import { branches as defaultBranches, appointmentTimeSlots as defaultTimeSlots } from "../data/contactData";
import { useQuery } from "../hooks/useQuery";
import { getBranches, getAppointmentTimeSlots } from "../services/api";

const today = new Date();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function generateCalendarDays() {
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function AppointmentSection() {
  const { data: branches } = useQuery(getBranches, defaultBranches);
  const { data: timeSlots } = useQuery(getAppointmentTimeSlots, defaultTimeSlots);
  const branchNames = branches.map((b) => b.name);

  const [selectedBranch, setSelectedBranch] = useState(branchNames[0]);
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const calendarDays = generateCalendarDays();

  return (
    <section className="py-24 bg-white" id="appointment">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Easy Scheduling</span>
          <h2 className="text-3xl md:text-4xl font-[Outfit] font-bold text-[hsl(var(--primary))]">Book Your Appointment</h2>
          <p className="text-gray-600 text-lg">Schedule a visit in just a few clicks — choose your branch, date, and time.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Branch, Calendar, Time */}
          <div className="lg:col-span-2 space-y-6">
            {/* Branch */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--accent))]"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                Select Branch
              </h3>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent outline-none"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                {branchNames.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--accent))]"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                {months[today.getMonth()]} {today.getFullYear()}
              </h3>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {days.map((d) => <div key={d} className="py-2 font-semibold text-gray-500">{d}</div>)}
                {calendarDays.map((day, i) => (
                  <button
                    key={i}
                    disabled={day === null || day < today.getDate()}
                    onClick={() => day && setSelectedDate(day)}
                    className={`py-2 rounded-lg text-sm transition-colors
                      ${day === null ? "invisible" : ""}
                      ${day !== null && day < today.getDate() ? "text-gray-300 cursor-not-allowed" : ""}
                      ${day === selectedDate ? "bg-[hsl(var(--primary))] text-white font-bold" : ""}
                      ${day === today.getDate() && day !== selectedDate ? "border border-[hsl(var(--accent))] text-[hsl(var(--accent))] font-semibold" : ""}
                      ${day !== null && day > today.getDate() && day !== selectedDate ? "hover:bg-gray-100 text-gray-700" : ""}
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--accent))]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Available Time Slots
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all
                      ${selectedTime === t
                        ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))] shadow-md"
                        : "border-gray-200 text-gray-600 hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                      }
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-28 space-y-5">
              <h3 className="text-lg font-bold text-gray-900">Your Details</h3>
              <div className="space-y-4">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent outline-none" />
                </div>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <input type="tel" placeholder="Phone Number" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent outline-none" />
                </div>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent outline-none" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <h4 className="font-semibold text-gray-900">Booking Summary</h4>
                <div className="flex justify-between text-gray-600">
                  <span>Date</span>
                  <span className="font-medium text-gray-900">{months[today.getMonth()]} {selectedDate}, {today.getFullYear()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Time</span>
                  <span className="font-medium text-gray-900">{selectedTime}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Branch</span>
                  <span className="font-medium text-gray-900 text-right max-w-45 truncate">{selectedBranch.split(" - ")[1]}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-[hsl(var(--accent))] hover:bg-[hsl(173,80%,35%)] text-white font-semibold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
                Confirm Booking
              </button>

              <p className="text-xs text-gray-400 text-center">You'll receive a confirmation via email &amp; SMS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
