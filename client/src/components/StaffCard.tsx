type Props = {
  name: string
  role: string
  department: string
  image: string
  description: string
}

export default function StaffCard({
  name,
  role,
  department,
  image,
  description
}: Props) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:scale-[1.03] transition-all">

      <div className="flex items-center gap-4">

        <img
          src={image}
          className="w-14 h-14 rounded-full object-cover border border-cyan-400"
        />

        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-cyan-400">{role}</p>
          <p className="text-xs text-gray-400">{department}</p>
        </div>

      </div>

      <p className="text-sm text-gray-300 mt-4 leading-relaxed">
        {description}
      </p>

    </div>
  )
}