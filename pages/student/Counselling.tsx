
import React, { useState } from 'react';
import { Star, Clock, Calendar as CalendarIcon, ShieldCheck, CheckCircle, CreditCard, X } from 'lucide-react';
import { MOCK_COUNSELLORS } from '../../constants';

const Counselling: React.FC<{ user: any }> = ({ user }) => {
  const [selectedCounsellor, setSelectedCounsellor] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleBook = (c: any) => {
    setSelectedCounsellor(c);
    setShowBooking(true);
    setBookingStep(1);
  };

  const completeBooking = () => {
    setBookingStep(3);
    setTimeout(() => {
      setShowBooking(false);
      setSelectedCounsellor(null);
      setBookingStep(1);
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">Professional Support</h2>
        <p className="text-indigo-700">Connect with licensed therapists. Your first trial session is only <span className="font-bold underline">₹59</span>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COUNSELLORS.map((c) => (
          <div key={c.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
            <div className="h-24 bg-indigo-50 flex items-end px-6 relative">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center translate-y-1/2 border border-slate-100 overflow-hidden">
                <img src={`https://picsum.photos/seed/${c.id}/100`} alt={c.fullName} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-slate-700">
                <Star size={12} className="text-amber-500 fill-amber-500" /> {c.rating}
              </div>
            </div>
            <div className="p-6 pt-10 flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{c.fullName}</h3>
                <p className="text-sm text-slate-500">{c.experience} Years Experience • {c.gender}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.expertise.map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{tag}</span>
                ))}
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{c.bio}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1"><CalendarIcon size={14} /> {c.availability}</div>
                <div className="flex items-center gap-1 font-bold text-slate-700">₹{c.price}/hr</div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-50 bg-slate-50/50">
              <button
                onClick={() => handleBook(c)}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
              >
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Book Appointment</h3>
              <button onClick={() => setShowBooking(false)}><X size={24} className="text-slate-400 hover:text-slate-600" /></button>
            </div>

            <div className="p-8">
              {bookingStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <img src={`https://picsum.photos/seed/${selectedCounsellor.id}/100`} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-slate-800">{selectedCounsellor.fullName}</p>
                      <p className="text-xs text-slate-500">First Trial Session • ₹59 only</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Select Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 font-medium"
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 text-sm rounded-lg font-bold border transition-all ${
                            selectedTime === slot ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50"
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-indigo-50 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between font-medium text-slate-700">
                      <span>Trial Session Fee</span>
                      <span className="text-slate-900 font-bold">₹59.00</span>
                    </div>
                    <div className="flex justify-between font-medium text-slate-700">
                      <span>Service Charge</span>
                      <span className="text-slate-900 font-bold">₹0.00</span>
                    </div>
                    <div className="h-[1px] bg-indigo-200"></div>
                    <div className="flex justify-between font-bold text-lg text-indigo-900">
                      <span>Total</span>
                      <span>₹59.00</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 border-2 border-indigo-600 rounded-2xl flex items-center justify-between bg-white">
                       <div className="flex items-center gap-3">
                         <CreditCard className="text-indigo-600" />
                         <span className="font-bold text-slate-800">Card Payment</span>
                       </div>
                       <CheckCircle className="text-indigo-600" />
                    </div>
                  </div>

                  <button
                    onClick={completeBooking}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg"
                  >
                    Pay & Confirm Booking
                  </button>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h3>
                  <p className="text-slate-600 font-medium">Your session with {selectedCounsellor.fullName} is scheduled for {selectedDate} at {selectedTime}.</p>
                  <p className="text-sm text-indigo-600 font-bold">Redirecting you to dashboard...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counselling;
