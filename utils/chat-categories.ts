import { mbtiCategories } from './mbti'

export interface TypeOption {
  code: string
  name: string
  description?: string
}

export interface ChatGroup {
  id: string
  name: string
  description: string
  color: string
  textColor: string
  font: string
  types: TypeOption[]
}

export const chatGroups: ChatGroup[] = [
  {
    id: 'mbti',
    name: 'MBTI',
    description: '16タイプの性格分類',
    color: '#FF6B6B',
    textColor: '#FFFFFF',
    font: "'Bebas Neue', cursive",
    types: mbtiCategories.flatMap(c => c.types),
  },
  {
    id: 'blood',
    name: '血液型',
    description: 'A/B/O/AB で交流',
    color: '#F87171',
    textColor: '#FFFFFF',
    font: "'Noto Sans JP', sans-serif",
    types: [
      { code: 'A', name: 'A型', description: '几帳面で協調的とされることが多い' },
      { code: 'B', name: 'B型', description: 'マイペースで好奇心旺盛' },
      { code: 'O', name: 'O型', description: '社交的でおおらか' },
      { code: 'AB', name: 'AB型', description: '独創的で二面性があるとされる' },
    ],
  },
  {
    id: 'gender',
    name: 'Gender',
    description: '性別別チャット',
    color: '#60A5FA',
    textColor: '#FFFFFF',
    font: "'Roboto', sans-serif",
    types: [
      { code: 'male', name: '男性' },
      { code: 'female', name: '女性' },
      { code: 'other', name: 'その他' },
    ],
  },
  {
    id: 'intro_extro',
    name: '陰キャ/陽キャ',
    description: '気質で交流',
    color: '#A78BFA',
    textColor: '#FFFFFF',
    font: "'Oswald', sans-serif",
    types: [
      { code: 'introvert', name: '陰キャ' },
      { code: 'extrovert', name: '陽キャ' },
    ],
  },
  {
    id: 'birth_month',
    name: '誕生月',
    description: '月ごとのルーム',
    color: '#34D399',
    textColor: '#FFFFFF',
    font: "'Noto Sans JP', sans-serif",
    types: [
      { code: '1', name: '1月' },
      { code: '2', name: '2月' },
      { code: '3', name: '3月' },
      { code: '4', name: '4月' },
      { code: '5', name: '5月' },
      { code: '6', name: '6月' },
      { code: '7', name: '7月' },
      { code: '8', name: '8月' },
      { code: '9', name: '9月' },
      { code: '10', name: '10月' },
      { code: '11', name: '11月' },
      { code: '12', name: '12月' },
    ],
  },
]

export type ChatGroupId = typeof chatGroups[number]['id']
export type ChatType = TypeOption
