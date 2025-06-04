export const mbtiCategories = [
  {
    name: "分析家（Analysts）",
    description: "論理的・分析的に物事を考え、新しいアイデアや戦略を打ち立てるのが得意。",
    color: "#FF6B6B",
    textColor: "#FFFFFF",
    font: "'Roboto', sans-serif",
    types: [
      { code: "INTJ", name: "建築家型", description: "内向 (I) + 直観 (N) + 思考 (T) + 判断 (J)\n戦略的・革新的で、体系を構築してゴールに向かうのが得意" },
      { code: "INTP", name: "論理学者型", description: "内向 (I) + 直観 (N) + 思考 (T) + 知覚 (P)\n好奇心旺盛で、アイデアや理論を深く追求するのが好き" },
      { code: "ENTJ", name: "指揮官型", description: "外向 (E) + 直観 (N) + 思考 (T) + 判断 (J)\nリーダーシップを発揮し、大きな目標に向かってチームを率いるのが得意" },
      { code: "ENTP", name: "討論者型", description: "外向 (E) + 直観 (N) + 思考 (T) + 知覚 (P)\n議論を楽しみ、新しいアイデアを次々と生み出す柔軟な思考を持つ" }
    ]
  },
  {
    name: "外交官（Diplomats）",
    description: "共感力に優れ、人間関係や理想を大切にして行動する。",
    color: "#4ECDC4",
    textColor: "#FFFFFF",
    font: "'Oswald', sans-serif",
    types: [
      { code: "INFJ", name: "提唱者型", description: "内向 (I) + 直観 (N) + 感情 (F) + 判断 (J)\n理想主義的で洞察力があり、周囲の人を高めるビジョンを持つ" },
      { code: "INFP", name: "仲介者型", description: "内向 (I) + 直観 (N) + 感情 (F) + 知覚 (P)\n豊かな想像力と深い共感力で、自分の価値観を重視する" },
      { code: "ENFJ", name: "主人公型", description: "外向 (E) + 直観 (N) + 感情 (F) + 判断 (J)\nカリスマ性と共感力を兼ね備え、人々を励まし導くリーダーシップを発揮" },
      { code: "ENFP", name: "広報運動家型", description: "外向 (E) + 直観 (N) + 感情 (F) + 知覚 (P)\n情熱的で自由奔放、新しいアイデアや人とのつながりから刺激を受ける" }
    ]
  },
  {
    name: "番人（Sentinels）",
    description: "現実的かつ秩序を重んじ、組織やコミュニティを支える力がある。",
    color: "#45B7D1",
    textColor: "#FFFFFF",
    font: "'Montserrat', sans-serif",
    types: [
      { code: "ISTJ", name: "管理者型", description: "内向 (I) + 感覚 (S) + 思考 (T) + 判断 (J)\n誠実で責任感が強く、計画的に物事を進める" },
      { code: "ISFJ", name: "擁護者型", description: "内向 (I) + 感覚 (S) + 感情 (F) + 判断 (J)\n思いやりがあり、周囲を支える縁の下の力持ち" },
      { code: "ESTJ", name: "幹部型", description: "外向 (E) + 感覚 (S) + 思考 (T) + 判断 (J)\n組織的で実務能力が高く、周囲をまとめるリーダーシップを発揮" },
      { code: "ESFJ", name: "領事官型", description: "外向 (E) + 感覚 (S) + 感情 (F) + 判断 (J)\n人とのつながりを重視し、協調的な環境づくりを得意とする" }
    ]
  },
  {
    name: "探検家（Explorers）",
    description: "柔軟で行動力があり、変化や新しい経験を楽しむ。",
    color: "#FFA500",
    textColor: "#FFFFFF",
    font: "'Bebas Neue', cursive",
    types: [
      { code: "ISTP", name: "巨匠型", description: "内向 (I) + 感覚 (S) + 思考 (T) + 知覚 (P)\n実践的・器用で、興味のあることにはとことん打ち込む" },
      { code: "ISFP", name: "冒険家型", description: "内向 (I) + 感覚 (S) + 感情 (F) + 知覚 (P)\n芸術性や五感を通じた体験を大切にし、柔軟性が高い" },
      { code: "ESTP", name: "起業家型", description: "外向 (E) + 感覚 (S) + 思考 (T) + 知覚 (P)\n行動力があり、チャンスを見逃さずに新しいことへ挑戦する" },
      { code: "ESFP", name: "エンターテイナー型", description: "外向 (E) + 感覚 (S) + 感情 (F) + 知覚 (P)\n周囲を楽しませるのが好きで、人間関係を盛り上げるムードメーカー" }
    ]
  }
];

export type MBTICategory = typeof mbtiCategories[number];
export type MBTIType = MBTICategory['types'][number];

export const mbtiTypes = mbtiCategories.flatMap(category => category.types.map(type => type.code));

export function isValidMBTIType(type: string): type is MBTIType['code'] {
  return mbtiTypes.includes(type as MBTIType['code']);
}
