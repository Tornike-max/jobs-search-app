export default function UserExperience({ experience }: { experience: string }) {
  return (
    <div className="flex flex-wrap gap-1">
      <div className="w-full flex justify-start text-2xl font-semibold text-indigo-600 pb-2">
        <h1>Experience</h1>
      </div>
      <div className="w-full border-[0.5px] border-stone-600 mb-2"></div>
      <span className="text-sm font-serif text-start">{experience}</span>
    </div>
  );
}
