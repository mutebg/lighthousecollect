import "./style";

const reportStatus = value => {
  if (value > 74) return "pass";
  else if (value > 45) return "average";
  else return "fail";
};

const Badge = ({ label, value }) => (
  <span class={"badge badge--" + reportStatus(value)}>
    <span class="badge__value">{value}</span>
    {label}
  </span>
);

export default Badge;
