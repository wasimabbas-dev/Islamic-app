interface FeatureBadgeProps {
  text: string;
}

const FeatureBadge = ({ text }: FeatureBadgeProps) => {
  return (
    <span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
      {text}
    </span>
  );
};

export default FeatureBadge;
