import React from 'react';

import { HeatMapSquare } from './HeatMapSquare';
import type { HeatMapItem } from '../Types';

type Props = {
    data: HeatMapItem[];
};

export function HeatMapRow({ data }: Props) {
  return (
    <>
      {data.map((item) => <HeatMapSquare key={item.id} color={item.color} />)}
    </>
  );
}
