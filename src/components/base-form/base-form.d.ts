// 允许的表单元素
type itemType =
  | 'input'
  | 'select'
  | 'password'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'slot'
  | 'date'
  | 'daterange';

type FormOption = {
  label: string;
  value: string | number;
  border?: boolean;
};

type RulesRequired = {
  required: boolean;
  message: string;
  trigger: 'blur' | 'change';
};
type RulesAuto = {
  pattern: RegExp;
  message: string;
  trigger: 'blur' | 'change';
};
type RulesMinx = {
  min: number;
  max: number;
  message: string;
  trigger: 'blur' | 'change';
};

type Rules = (RulesRequired | RulesAuto | RulesMinx)[];

// 单个表单元素属性
interface IformItem {
  /**prop、元素绑定的key、插槽名字*/
  filed: string;
  label: string;
  type: itemType;
  labelWidth?: string;
  rules?: Rules;
  /**是否使用layout布局*/
  useLayout?: boolean;
  /**默认一行三列布局，可先layout传空再传入span控制每行占的列数*/
  span?: number;
  placeholder?: string;
  disabled?: boolean;
  input?: {
    maxlength?: string | number;
    /**是否显示切换密码图标*/
    showPassword?: boolean;
  };
  textarea?: {
    maxlength?: string | number;
    /**textarea { minRows: 2, maxRows: 6 }*/
    autosize?: boolean | object;
    showWordLimit?: boolean;
  };
  /**select、radio、checkbox*/
  radio?: {
    options: FormOption[];
  };
  checkbox?: {
    options: FormOption[];
  };
  select?: {
    // 是否可筛选
    filterable?: boolean;
    //是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。
    allowCreate?: boolean;
    options: FormOption[];
  };
  date?: {
    valueFormat: string;
    /**开始时间和结束时间之间的连接符*/
    rangeSeparator?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    /**文本框可输入*/
    editable?: boolean;
  };
}
