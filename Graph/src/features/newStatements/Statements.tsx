import FilterUserStatements from "./FilterUserStatements";
import StatementHeader from "./StatementHeader";
import UserStatements from "./UserStatements";

export default function Statements() {
  return (
    <div className="w-full space-y-10">
      <StatementHeader />
      <FilterUserStatements />
      <UserStatements />
    </div>
  );
}
