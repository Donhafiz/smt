import { staff } from '../data/staff'
import StaffCard from '../components/StaffCard'

export default function StaffPage() {
  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400">
          Our Team
        </h1>

        <p className="text-gray-300 mt-3">
          Meet the professionals behind Star Media Tech
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {staff.map((member) => (
          <StaffCard
            key={member.id}
            name={member.name}
            role={member.role}
            department={member.department}
            image={member.image}
            description={member.description}
          />
        ))}

      </div>

    </div>
  )
}