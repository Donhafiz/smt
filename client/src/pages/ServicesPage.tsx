import { services } from '../data/services'
import ServiceCard from '../components/ServiceCard'

export default function ServicesPage() {
  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400">
          Our Services
        </h1>

        <p className="text-gray-300 mt-3">
          Explore all SMT core business units and solutions
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            category={service.category}
          />
        ))}

      </div>

    </div>
  )
}