import "./style";

const reportStatus = value => {
  if (value > 89) return "pass";
  else if (value > 49) return "average";
  else return "fail";
};

const Badge = ({ label, value, goal }) => {
  const goalClass =
    goal > 0 ? (value >= goal ? "pass-goal" : "fail-goal") : "no-goal";
  return (
    <span
      class={"badge badge--" + reportStatus(value) + " badge--" + goalClass}
      title={value + " of " + goal}
    >
      <span class="badge__value">{value}</span>
      {label}
    </span>
  );
};

export default Badge;
