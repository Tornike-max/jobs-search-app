export default function UserName({ name }: { name: string }) {
  return (
    <div className="text-xl md:text-3xl">
      <h1>{name}</h1>
    </div>
  );
}
