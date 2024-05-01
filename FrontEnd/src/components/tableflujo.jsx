import { RiFlag2Line } from '@remixicon/react';
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

const data = [
  {
    fecha: '04/04/2024',
    ph: '1.6',
    status: 'active',
  },
  {
    fecha: '05/02/2024',
    ph: '2.4',
    status: 'active',
  },
  {
    fecha: '06/04/2024',
    ph: '2.0',
    status: 'processing',
  },
];

export function TableFlujo() {
  return (
    <Card className='bg-white'> 
      <h3 className="text-tremor-content-strong font-semibold text-center text-2xl">Historial de revisiones</h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell className='text-black'>Fecha</TableHeaderCell>
            <TableHeaderCell className='text-black'>Nivel de PH</TableHeaderCell>
            <TableHeaderCell className='text-black'>Estado</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.fecha}>
              <TableCell>{item.fecha}</TableCell>
              <TableCell>
                {item.ph}
              </TableCell>
              <TableCell>
                <Badge color="emerald" icon={RiFlag2Line}>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}