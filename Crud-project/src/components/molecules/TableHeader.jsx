import TableHeaderCell from "../atoms/table/TableHeaderCell";

export function TableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <TableHeaderCell key={index}>{header}</TableHeaderCell>
        ))}
      </tr>
    </thead>
  );
}
