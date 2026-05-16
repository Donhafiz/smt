import { forwardRef } from 'react'
import { Phone, Mail, MapPin, Shield, QrCode } from 'lucide-react'

interface StaffIDCardProps {
  staff: {
    name: string
    staffId: string
    role: string
    department: string
    email: string
    phone: string
    photo: string
    idCardNumber: string
    joiningDate: string
  }
}

const StaffIDCard = forwardRef<HTMLDivElement, StaffIDCardProps>(({ staff }, ref) => {
  return (
    <div ref={ref} className="w-[350px] bg-white text-black rounded-2xl overflow-hidden shadow-2xl print:shadow-none" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Shield size={18} />
          <span className="text-sm font-bold tracking-wider">STAR MEDIA TECH</span>
        </div>
        <p className="text-[10px] opacity-80">Premium Technology Institution</p>
        <p className="text-[8px] opacity-60 mt-1">Tamale, Ghana | +233 559 137 611</p>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Photo & Details Row */}
        <div className="flex gap-4 mb-4">
          {/* Photo */}
          <div className="w-24 h-28 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-200 flex-shrink-0 border-2 border-cyan-200">
            {staff.photo ? (
              <img src={staff.photo} alt={staff.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-cyan-600">
                {staff.name?.charAt(0) || '?'}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{staff.name}</h3>
            <p className="text-sm text-cyan-700 font-semibold">{staff.role}</p>
            <p className="text-xs text-gray-500">{staff.department}</p>
            
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="font-bold text-gray-800">ID:</span> {staff.staffId}
              </div>
              {staff.email && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Mail size={10} /> {staff.email}
                </div>
              )}
              {staff.phone && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Phone size={10} /> {staff.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Number & Barcode */}
        <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] text-gray-400 uppercase">Card Number</p>
            <p className="text-xs font-mono font-bold text-gray-700">{staff.idCardNumber || 'SMT-ID-' + staff.staffId}</p>
            {staff.joiningDate && (
              <p className="text-[9px] text-gray-400 mt-1">
                Issued: {new Date(staff.joiningDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <QrCode size={40} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-2 text-center">
        <p className="text-[9px] text-white/70">This card is property of Star Media Tech. If found, please return to Tamale office.</p>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          @page { size: 54mm 85mm; margin: 0; }
        }
      `}</style>
    </div>
  )
})

StaffIDCard.displayName = 'StaffIDCard'

export default StaffIDCard