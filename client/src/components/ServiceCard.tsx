type Props = {
  title: string
  description: string
  icon: string
  category: string
}

export default function ServiceCard({
  title,
  description,
  icon,
  category
}: Props) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:scale-[1.03] transition-all">

      <div className="text-3xl">{icon}</div>

      <p className="text-xs text-cyan-400 mt-2">{category}</p>

      <h3 className="text-xl font-bold mt-2">{title}</h3>

      <p className="text-gray-300 mt-2 text-sm leading-relaxed">
        {description}
      </p>

      <button className="mt-4 text-cyan-400 text-sm hover:underline">
        Learn more →
      </button>

    </div>
  )
}