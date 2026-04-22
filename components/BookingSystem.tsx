"use client";

import React, { useMemo, useEffect, useState, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { X, MapPin, ChevronRight, Clock } from "lucide-react";
import { useTickets } from "@/context/TicketContext";

export interface SeatSelectionProps {
  movie: any;
  selectedSeatInfo: { time: string; theater: any };
  seatCount: number;
  selectedSeats: string[];
  setSelectedSeats: Dispatch<SetStateAction<string[]>>;
  formatType: string;
  selectedDate: number;
  days: { dayName: string; dateNum: number; month: string; fullDate: string }[];
  dummyStudio: string;
  dummyOccupiedSeats: string[];
  onClose: () => void;
  onContinue: () => void;
  showSeatWarning: boolean;
  setShowSeatWarning: Dispatch<SetStateAction<boolean>>;
}

export function SeatSelection({
  movie,
  selectedSeatInfo,
  seatCount,
  selectedSeats,
  setSelectedSeats,
  formatType,
  selectedDate,
  days,
  dummyStudio,
  dummyOccupiedSeats,
  onClose,
  onContinue,
  showSeatWarning,
  setShowSeatWarning
}: SeatSelectionProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[9999] bg-[#000814] flex flex-col md:flex-row text-white overflow-hidden pt-[70px] md:pt-[90px]">
        {/* MAIN SEAT AREA */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center pb-40 px-4">
          
          {/* HEADER */}
          <div className="w-full p-4 md:p-6 flex items-center gap-4 mb-2 md:mb-4 shrink-0 text-white">
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <h2 className="text-xl md:text-2xl font-bold">Pilih kursi kamu</h2>
          </div>

          {/* LEGEND */}
          <div className="flex gap-6 mb-8 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white/10 rounded border border-white/20"></div> Tersedia</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white/20 rounded"></div> Dibooking</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-rose-600 rounded"></div> Terisi</div>
          </div>

          {/* SCREEN */}
          <div className="w-full max-w-2xl mb-12 relative flex justify-center">
             <div className="w-full h-12 bg-gradient-to-b from-cyan-900/40 to-transparent flex items-center justify-center border-t-4 border-cyan-500/50 shadow-[0_-10px_30px_rgba(6,182,212,0.15)]" style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 100%, 0% 100%)' }}>
               <span className="text-cyan-500/80 font-bold uppercase tracking-[0.3em] text-sm mt-2">Area Layar</span>
             </div>
          </div>

          {/* SEATS GRID */}
          <div className="flex gap-6 md:gap-12 justify-center w-full overflow-x-auto pb-8 no-scrollbar">
            {/* Left Block */}
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selectedSeatInfo.theater.type === "XXI" || selectedSeatInfo.theater.name.includes("XXI") ? 6 : 5}, minmax(0, 1fr))` }}>
              {(() => {
                 const isXXI = selectedSeatInfo.theater.type === "XXI" || selectedSeatInfo.theater.name.includes("XXI");
                 const rows = isXXI ? ['J','H','G','F','E','D','C','B'] : ['H','G','F','E','D','C','B','A'];
                 const maxCol = isXXI ? 12 : 10;
                 const half = Math.floor(maxCol / 2);
                 
                 return rows.map(row => {
                   return Array.from({length: half}).map((_, i) => {
                     const col = maxCol - i;
                     const seatId = `${row}${col}`;
                     const isOccupied = dummyOccupiedSeats.includes(seatId);
                     const isSelected = selectedSeats.includes(seatId);
                     return (
                       <button
                         key={seatId}
                         disabled={isOccupied}
                         onClick={() => {
                           if (isSelected) {
                             setSelectedSeats(prev => prev.filter(s => s !== seatId));
                           } else {
                             if (selectedSeats.length < seatCount) {
                               setSelectedSeats(prev => [...prev, seatId]);
                             } else {
                               setShowSeatWarning(true);
                             }
                           }
                         }}
                         className={`w-7 h-7 md:w-9 md:h-9 text-[9px] md:text-[10px] font-bold rounded-t-md rounded-b-sm flex items-center justify-center transition-all ${isOccupied ? 'bg-rose-600 text-white cursor-not-allowed opacity-80' : isSelected ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110 border border-cyan-400' : 'bg-white/5 text-slate-300 hover:bg-white/15 border border-white/10 hover:border-white/20'}`}
                       >
                         {seatId}
                       </button>
                     );
                   });
                 });
              })()}
            </div>

            {/* Right Block */}
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selectedSeatInfo.theater.type === "XXI" || selectedSeatInfo.theater.name.includes("XXI") ? 6 : 5}, minmax(0, 1fr))` }}>
              {(() => {
                 const isXXI = selectedSeatInfo.theater.type === "XXI" || selectedSeatInfo.theater.name.includes("XXI");
                 const rows = isXXI ? ['J','H','G','F','E','D','C','B'] : ['H','G','F','E','D','C','B','A'];
                 const maxCol = isXXI ? 12 : 10;
                 const half = Math.floor(maxCol / 2);
                 
                 return rows.map(row => {
                   return Array.from({length: maxCol - half}).map((_, i) => {
                     const col = half - i;
                     const seatId = `${row}${col}`;
                     const isOccupied = dummyOccupiedSeats.includes(seatId);
                     const isSelected = selectedSeats.includes(seatId);
                     return (
                       <button
                         key={seatId}
                         disabled={isOccupied}
                         onClick={() => {
                           if (isSelected) {
                             setSelectedSeats(prev => prev.filter(s => s !== seatId));
                           } else {
                             if (selectedSeats.length < seatCount) {
                               setSelectedSeats(prev => [...prev, seatId]);
                             } else {
                               setShowSeatWarning(true);
                             }
                           }
                         }}
                         className={`w-7 h-7 md:w-9 md:h-9 text-[9px] md:text-[10px] font-bold rounded-t-md rounded-b-sm flex items-center justify-center transition-all ${isOccupied ? 'bg-rose-600 text-white cursor-not-allowed opacity-80' : isSelected ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110 border border-cyan-400' : 'bg-white/5 text-slate-300 hover:bg-white/15 border border-white/10 hover:border-white/20'}`}
                       >
                         {seatId}
                       </button>
                     );
                   });
                 });
              })()}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL (SUMMARY) */}
        <div className="w-full md:w-[400px] bg-[#000814] border-t md:border-t-0 md:border-l border-white/10 p-6 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col z-20 h-full overflow-y-auto">
          
          {/* Movie Info */}
          <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
            <img src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`} className="w-20 rounded-xl shadow-lg border border-white/10" alt="poster" />
            <div>
              <h3 className="font-black text-base uppercase mb-2 leading-tight text-white">{movie?.title || "Movie Title"}</h3>
              <p className="text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-[8px] italic text-cyan-400 rounded-sm leading-none">{selectedSeatInfo.theater.type}</span>
                {selectedSeatInfo.theater.name}
              </p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-500" /> {dummyStudio}, {formatType}
              </p>
              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                {days[selectedDate].dayName}, {days[selectedDate].dateNum} {days[selectedDate].month} {new Date().getFullYear()}
              </p>
            </div>
          </div>

          {/* TIME CONTAINER */}
          <div className="mb-4 bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Jam Tayang</p>
              <p className="text-sm font-black text-white">{selectedSeatInfo.time}</p>
            </div>
          </div>

          {/* Selected Seats Summary */}
          <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm">
            <h4 className="font-bold text-sm mb-2 text-slate-200">Nomor kursi</h4>
            {selectedSeats.length === 0 ? (
              <p className="text-sm text-slate-500 font-medium">Kamu belum pilih kursi</p>
            ) : (
              <p className="text-sm font-bold text-cyan-400">{selectedSeats.join(', ')}</p>
            )}
          </div>

          {/* Total */}
          <div className="mt-auto pt-6 mb-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-1 mt-4">
              <span className="text-slate-400 text-sm font-medium">{selectedSeats.length} kursi terpilih</span>
              <span className="text-xl font-black text-white">
                Rp {((formatType === "2D" ? selectedSeatInfo.theater.price2D : selectedSeatInfo.theater.price3D) * selectedSeats.length).toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedSeats([])}
              className="flex-1 py-4 rounded-2xl border border-white/20 font-bold text-slate-400 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              Hapus pilihan
            </button>
            <button 
              disabled={selectedSeats.length < seatCount}
              onClick={onContinue}
              className={`flex-1 py-4 rounded-2xl font-bold text-white transition-all text-sm shadow-xl ${selectedSeats.length === seatCount ? 'bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'}`}
            >
              Lanjut
            </button>
          </div>

        </div>
      </div>

      {/* WARNING MODAL OVERLAY */}
      {showSeatWarning && (
        <div className="fixed inset-0 z-[10001] bg-[#000814]/80 flex items-center justify-center p-4 backdrop-blur-md transition-opacity">
          <div className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[32px] p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300">
            {/* Icon Circle */}
            <div className="w-24 h-24 bg-cyan-900/30 border border-cyan-500/20 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 6v10h8a2 2 0 0 0 2-2v-4"/>
                <path d="M8 16v3"/>
                <path d="M16 16v3"/>
                <line x1="5" y1="21" x2="19" y2="21"/>
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 leading-tight">
              Kursi yang dipilih kebanyakan,<br/>nih
            </h3>
            
            <p className="text-sm text-slate-400 mb-8 px-2 leading-relaxed">
              Kamu cuma bisa milih {seatCount} kursi dalam satu pesanan.
            </p>
            
            <button 
              onClick={() => setShowSeatWarning(false)}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-full transition-transform active:scale-95 text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              Siap
            </button>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}

export interface PaymentFlowProps {
  movie: any;
  selectedSeatInfo: { time: string; theater: any };
  selectedSeats: string[];
  seatCount: number;
  formatType: string;
  selectedDate: number;
  days: { dayName: string; dateNum: number; month: string; fullDate: string }[];
  dummyStudio: string;
  onClose: () => void;
  onComplete: () => void;
  showCheckout: boolean;
  setShowCheckout: Dispatch<SetStateAction<boolean>>;
  paymentStatus: string;
  setPaymentStatus: Dispatch<SetStateAction<any>>;
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  saveCard: boolean;
  setSaveCard: Dispatch<SetStateAction<boolean>>;
}

export function PaymentFlow({
  movie,
  selectedSeatInfo,
  selectedSeats,
  seatCount,
  formatType,
  selectedDate,
  days,
  dummyStudio,
  onClose,
  onComplete,
  showCheckout,
  setShowCheckout,
  paymentStatus,
  setPaymentStatus,
  paymentMethod,
  setPaymentMethod,
  timeLeft,
  setTimeLeft,
  saveCard,
  setSaveCard
}: PaymentFlowProps) {
  const { addTicket } = useTickets();
  const [ticketAdded, setTicketAdded] = useState(false);

  const orderId = useMemo(() => {
    return `OCN-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  }, []);

  useEffect(() => {
    if (showCheckout && timeLeft > 0 && paymentStatus !== 'success') {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && showCheckout && paymentStatus !== 'success') {
      setShowCheckout(false);
      setPaymentStatus('idle');
      alert('Waktu pembayaran habis, silahkan ulangi.');
    }
  }, [showCheckout, timeLeft, paymentStatus, setTimeLeft, setShowCheckout, setPaymentStatus]);

  useEffect(() => {
    if (paymentStatus === 'success' && !ticketAdded) {
      const ticketDateObj = new Date(days[selectedDate].fullDate);
      const [h, m] = selectedSeatInfo.time.split(':');
      ticketDateObj.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
      const timestamp = ticketDateObj.getTime();

      const newTicket = {
        id: "t_" + Date.now().toString(),
        status: "active" as const,
        movie: {
          title: movie?.title || "Unknown Movie",
          poster_path: movie?.poster_path || "",
        },
        theater: selectedSeatInfo.theater,
        date: `${days[selectedDate].dayName}, ${days[selectedDate].dateNum} ${days[selectedDate].month} ${new Date().getFullYear()}`,
        time: selectedSeatInfo.time,
        seatCount: selectedSeats.length,
        seats: selectedSeats,
        bookingCode: orderId.slice(0, 10),
        passKey: Math.floor(100000 + Math.random() * 900000).toString(),
        orderNumber: orderId,
        price: formatType === "2D" ? selectedSeatInfo.theater.price2D : selectedSeatInfo.theater.price3D,
        serviceFee: 12000,
        paymentMethod: paymentMethod === "qris" ? "QRIS" : "DANA",
        format: formatType,
        audi: dummyStudio,
        timestamp,
      };
      addTicket(newTicket);
      setTicketAdded(true);
    }
  }, [paymentStatus, ticketAdded, addTicket, movie, selectedSeatInfo, days, selectedDate, selectedSeats, orderId, formatType, dummyStudio, paymentMethod]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };


  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <>
      {showCheckout && selectedSeatInfo && paymentStatus === 'idle' && (
        <div className="fixed inset-0 z-[9999] bg-[#000814] text-white flex flex-col overflow-y-auto pt-[70px] md:pt-[90px]">
          <div className="fixed left-0 right-0 top-[70px] md:top-[90px] bg-cyan-950/40 border-b border-cyan-900/50 py-3 px-4 flex items-center justify-center gap-2 text-sm text-cyan-400 font-semibold shadow-inner z-[80] backdrop-blur-md">
            Selesaikan pembayaran dalam <span className="font-mono font-bold text-lg bg-[#000814] px-3 py-0.5 rounded-lg border border-cyan-800 shadow-[0_0_10px_rgba(6,182,212,0.2)]">{formatTime(timeLeft)}</span>
          </div>

          <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-8 p-4 md:p-8 pt-20 md:pt-24">
            <div className="flex-1 flex flex-col gap-8">
               <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center -ml-2">
                   <ChevronRight className="w-6 h-6 rotate-180" />
                 </button>
                 <h3 className="text-xl md:text-2xl font-bold">Pilih metode pembayaran</h3>
               </div>

               <div className="flex flex-col gap-4">
                 <h4 className="font-bold text-slate-300">Cards</h4>
                 <div className={`rounded-2xl border transition-all overflow-hidden ${paymentMethod === 'card' ? 'bg-cyan-900/10 border-cyan-500' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                   <label className="cursor-pointer flex items-center justify-between p-4">
                     <div className="flex items-center gap-4">
                       <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-cyan-500" />
                       <p className="font-bold">Credit Card / Debit Card</p>
                     </div>
                     <div className="w-8 h-6 bg-slate-800 rounded border border-white/20 flex items-center justify-center">
                       <div className="w-4 h-3 border border-white/50 rounded-sm"></div>
                     </div>
                   </label>
                   
                   {paymentMethod === 'card' && (
                     <div className="p-4 border-t border-white/10 bg-black/20 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
                       <div className="flex justify-between items-center mb-2">
                         <p className="text-xs text-slate-400">Mitra kami</p>
                         <div className="flex gap-2 text-xs font-black tracking-tighter">
                           <span className="text-blue-500 italic">VISA</span>
                           <span className="text-red-500">mastercard</span>
                         </div>
                       </div>
                       <input type="text" placeholder="Nomor kartu" className="w-full bg-white/5 border border-white/20 rounded-xl p-4 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500 font-mono" />
                       <div className="flex gap-4">
                         <input type="text" placeholder="Valid thru" className="flex-1 bg-white/5 border border-white/20 rounded-xl p-4 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500 font-mono" />
                         <input type="text" placeholder="CVV/CVC" className="flex-1 bg-white/5 border border-white/20 rounded-xl p-4 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500 font-mono" />
                       </div>
                       <div className="flex items-center gap-3 bg-cyan-900/20 p-4 rounded-xl border border-cyan-500/20">
                         <div className="w-5 h-5 rounded-md border border-cyan-500 flex items-center justify-center text-cyan-400 bg-cyan-950">!</div>
                         <p className="text-xs text-cyan-100/80">Data kartu kamu akan disimpan dengan aman.</p>
                       </div>
                       <label className="flex items-center gap-3 mt-2 cursor-pointer">
                         <div className={`w-10 h-6 rounded-full p-1 transition-colors ${saveCard ? 'bg-cyan-500' : 'bg-slate-700'}`} onClick={() => setSaveCard(!saveCard)}>
                           <div className={`w-4 h-4 rounded-full bg-white transition-transform ${saveCard ? 'translate-x-4' : 'translate-x-0'}`}></div>
                         </div>
                         <span className="text-sm font-bold text-slate-300">Simpan kartu untuk transaksi ke depan</span>
                       </label>
                     </div>
                   )}
                 </div>
               </div>

               <div className="flex flex-col gap-4">
                 <h4 className="font-bold text-slate-300">E-Wallet</h4>
                 <div className={`rounded-2xl border transition-all overflow-hidden ${paymentMethod === 'qris' ? 'bg-cyan-900/10 border-cyan-500' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                   <label className="cursor-pointer flex items-center justify-between p-4">
                     <div className="flex items-center gap-4">
                       <input type="radio" name="payment" value="qris" checked={paymentMethod === 'qris'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-cyan-500" />
                       <p className="font-bold">QRIS</p>
                     </div>
                     <div className="px-2 py-1 bg-red-600 rounded text-white font-black text-xs border border-red-500">QRIS</div>
                   </label>
                   
                   {paymentMethod === 'qris' && (
                     <div className="p-6 border-t border-white/10 bg-black/20 flex flex-col items-center justify-center gap-4 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-sm text-slate-300 text-center max-w-xs mt-2">
                          Klik tombol <span className="font-bold text-white">Bayar</span> di bawah untuk menampilkan QR Code.
                        </p>
                     </div>
                   )}
                 </div>
               </div>
            </div>

            <div className="w-full md:w-[400px] shrink-0">
               <div className="bg-[#0a1120] border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-24 md:top-32">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-4 mb-6">Detail pesanan</h3>
                  <div className="flex gap-4 mb-6">
                    <img src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`} className="w-16 rounded-lg shadow-md" alt="poster" />
                    <div>
                      <h4 className="font-black text-sm uppercase mb-1 leading-tight">{movie?.title}</h4>
                      <p className="text-[10px] font-bold text-slate-300 mb-1 flex items-center gap-1">
                        <span className="px-1 py-0.5 bg-white/10 border border-white/20 text-[7px] italic text-cyan-400 rounded-sm">{selectedSeatInfo.theater.type}</span>
                        {selectedSeatInfo.theater.name}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {days[selectedDate].dayName}, {days[selectedDate].dateNum} {days[selectedDate].month} {new Date().getFullYear()}, {selectedSeatInfo.time}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm font-medium border-t border-white/10 pt-6">
                    <div className="flex justify-between items-start">
                       <div>
                         <p className="font-bold text-slate-200">Tiket</p>
                         <p className="text-xs text-slate-500 mt-1">{selectedSeats.join(', ')}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-slate-400 text-xs">{selectedSeats.length} x Rp{((formatType === "2D" ? selectedSeatInfo.theater.price2D : selectedSeatInfo.theater.price3D)).toLocaleString("id-ID")}</p>
                         <p className="font-bold text-white">Rp{((formatType === "2D" ? selectedSeatInfo.theater.price2D : selectedSeatInfo.theater.price3D) * selectedSeats.length).toLocaleString("id-ID")}</p>
                       </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-slate-300">
                       <p>Subtotal</p>
                       <p className="font-bold">Rp{((formatType === "2D" ? selectedSeatInfo.theater.price2D : selectedSeatInfo.theater.price3D) * selectedSeats.length).toLocaleString("id-ID")}</p>
                    </div>
                    
                    <div className="flex justify-between items-center text-slate-300">
                       <p className="flex items-center gap-1">Biaya pemesanan <span className="w-3 h-3 rounded-full border border-slate-500 text-[8px] flex items-center justify-center">i</span></p>
                       <p className="font-bold">Rp12.000</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-slate-200">Total pembayaran</span>
                      <span className="text-xl font-black text-cyan-400">
                        Rp {(((formatType === "2D" ? selectedSeatInfo.theater.price2D : selectedSeatInfo.theater.price3D) * selectedSeats.length) + 12000).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <button 
                      disabled={!paymentMethod}
                      onClick={() => {
                        if (paymentMethod === 'qris') {
                          setPaymentStatus('qris_scan');
                        } else {
                          setPaymentStatus('success');
                        }
                      }}
                      className={`w-full py-4 rounded-full font-bold text-white transition-all shadow-xl ${paymentMethod ? 'bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'}`}
                    >
                      Bayar Rp{(((formatType === "2D" ? selectedSeatInfo.theater.price2D : selectedSeatInfo.theater.price3D) * selectedSeats.length) + 12000).toLocaleString("id-ID")}
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {paymentStatus === 'qris_scan' && selectedSeatInfo && (
        <div className="fixed inset-0 z-[10004] bg-[#000814]/90 backdrop-blur-md flex p-4 md:p-8 overflow-y-auto">
          <div className="m-auto my-8 md:my-auto bg-[#0f172a] w-full max-w-sm rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 p-6 md:p-8 items-center text-center">
            <h3 className="text-xl font-bold text-white mb-2">Scan QRIS</h3>
            <p className="text-sm text-slate-400 mb-6">Total: Rp {(((formatType === "2D" ? selectedSeatInfo.theater.price2D : selectedSeatInfo.theater.price3D) * selectedSeats.length) + 12000).toLocaleString("id-ID")}</p>
            <div className="bg-white p-4 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] relative mb-6">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=oceantix_dummy_qris" alt="Dummy QRIS" className="w-40 h-40 md:w-48 md:h-48" />
            </div>
            <p className="text-xs text-slate-400 text-center max-w-xs mb-6">Scan QR code ini menggunakan aplikasi e-wallet pilihanmu.</p>
            <button 
              onClick={() => setPaymentStatus('success')}
              className="w-full px-6 py-4 border border-cyan-500/50 rounded-full text-cyan-400 font-bold hover:bg-cyan-500/10 transition-colors"
            >
              [ Simulasikan Pembayaran Berhasil ]
            </button>
            <button 
              onClick={() => setPaymentStatus('idle')}
              className="w-full mt-3 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {paymentStatus === 'success' && selectedSeatInfo && (
        <div className="fixed inset-0 z-[10005] bg-[#000814]/90 backdrop-blur-md flex p-4 md:p-8 overflow-y-auto">
          <div className="m-auto my-8 md:my-auto bg-[#0f172a] w-full max-w-sm rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="bg-gradient-to-br from-cyan-900 to-[#0f172a] p-5 md:p-6 text-center border-b border-white/10 relative">
               <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               </div>
               <h2 className="text-xl font-black text-white tracking-wide">Pembayaran Berhasil!</h2>
               <p className="text-xs text-cyan-200/70 mt-1">Ini E-Ticket kamu, siap di-scan!</p>
               <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#000814]/90"></div>
               <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-[#000814]/90"></div>
            </div>

            <div className="p-5 md:p-6 flex flex-col items-center bg-white/5">
               <div className="bg-white p-3 md:p-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-5 md:mb-6">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=oceantix_ticket_dummy_12345" alt="Ticket QR" className="w-32 h-32 md:w-40 md:h-40" />
               </div>
               <div className="w-full text-center mb-5 md:mb-6">
                 <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-white mb-1">{movie?.title}</h3>
                 <p className="text-[11px] md:text-xs text-slate-400 font-medium">
                   {days[selectedDate].dayName}, {days[selectedDate].dateNum} {days[selectedDate].month} {new Date().getFullYear()} • {selectedSeatInfo.time}
                 </p>
               </div>
               <div className="w-full grid grid-cols-2 gap-3 md:gap-4 border-t border-dashed border-white/20 pt-5 md:pt-6">
                 <div>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Bioskop</p>
                   <p className="text-sm font-bold text-slate-200 leading-tight">{selectedSeatInfo.theater.name}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Studio</p>
                   <div className="flex items-center justify-end gap-2">
                     <span className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-[8px] italic text-cyan-400 rounded-sm">{selectedSeatInfo.theater.type}</span>
                     <p className="text-sm font-bold text-slate-200">{dummyStudio}</p>
                   </div>
                 </div>
                 <div>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Kursi</p>
                   <p className="text-sm font-black text-cyan-400">{selectedSeats.join(', ')}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Order ID</p>
                   <p className="text-sm font-mono text-slate-400">{orderId}</p>
                 </div>
               </div>
            </div>

            <div className="p-5 md:p-6 bg-[#0a1120] border-t border-dashed border-white/20 relative">
               <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#000814]/90"></div>
               <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#000814]/90"></div>
               <button 
                 onClick={() => {
                   onComplete();
                 }}
                 className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
               >
                 Kembali ke Beranda
               </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
