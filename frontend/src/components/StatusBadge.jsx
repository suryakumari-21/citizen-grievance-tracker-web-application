// frontend/src/components/StatusBadge.jsx
export default function StatusBadge({ status }) {
  let classes = 'inline-block px-3 py-1 rounded-full text-sm font-medium ';
  if (status === 'Pending') classes += 'bg-yellow-100 text-yellow-800';
  else if (status === 'In Progress') classes += 'bg-orange-100 text-orange-800';
  else if (status === 'Resolved') classes += 'bg-green-100 text-green-800';
  return <span className={classes}>{status}</span>;
}
