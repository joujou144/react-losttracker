type BadgeProps = {
  activeCase: boolean;
};

const VARIANT_COLOUR = {
  active: "bg-emerald-500",
  cold: "bg-blue-500",
};

export const CaseStatus = ({ activeCase }: BadgeProps) => {
  const status = activeCase ? "active" : "cold";

  return (
    <span
      className={`${VARIANT_COLOUR[status]} text-primary-700 px-4 py-1 rounded-2xl`}
    >
      {status === "active" ? "Active" : "Cold"}
    </span>
  );
};
