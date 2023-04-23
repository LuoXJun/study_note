export const config: IformItem[] = [
  {
    filed: 'title',
    label: '标题',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    filed: 'path',
    label: '访问路径',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    filed: 'component',
    label: '文件路径',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    filed: 'type',
    label: '菜单类型',
    type: 'select',
    select: {
      options: [
        { label: '菜单', value: 'menu' },
        { label: '按钮', value: 'link' },
        { label: '其他（详情页）', value: 'other' }
      ]
    },
    rules: [{ required: true, message: '请输入', trigger: 'change' }]
  },
  {
    filed: 'level',
    label: '选择父级',
    type: 'slot'
  },
  {
    filed: 'icon',
    label: '图标',
    type: 'slot'
  },
  {
    filed: 'isHidden',
    label: '是否隐藏',
    type: 'select',
    select: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
  }
];
