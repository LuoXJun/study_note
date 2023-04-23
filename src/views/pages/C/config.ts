export const formConfig: IformItem[] = [
  {
    filed: 'select',
    label: 'select',
    type: 'select',
    select: {
      options: [{ label: 'select', value: 123 }]
    }
  },
  { filed: 'date', label: 'date', type: 'date' },
  { filed: 'daterange', label: 'daterange', type: 'daterange' },
  { filed: 'slot', label: 'slot', type: 'slot' },
  { filed: 'input', label: 'input', type: 'input' }
];
export const tableConfig: ITableColumn[] = [
  { filed: 'name', label: 'name' },
  { filed: 'operation', label: '操作', options: { fixed: 'right' } }
];
